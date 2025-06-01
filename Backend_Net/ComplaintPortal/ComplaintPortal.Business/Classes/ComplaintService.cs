using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;
using Microsoft.AspNetCore.Hosting; // For IWebHostEnvironment
using Microsoft.AspNetCore.Http; // For IFormFile

namespace ComplaintPortal.Business.Classes
{
    public class ComplaintService : IComplaintService
    {
        private readonly IComplaintRepository _complaintRepository;
        private readonly IComplaintTypeRepository _complaintTypeRepository; // New injection
        private readonly IComplaintStatusRepository _complaintStatusRepository; // New injection
        private readonly IRoleRepository _roleRepository;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;

        // Consolidated constructor to inject all required dependencies
        public ComplaintService(
            IComplaintRepository complaintRepository,
            IComplaintTypeRepository complaintTypeRepository,
            IComplaintStatusRepository complaintStatusRepository, 
            IRoleRepository roleRepository,
            IWebHostEnvironment env,
            IHttpContextAccessor httpContextAccessor)
        {
            _complaintRepository = complaintRepository;
            _complaintTypeRepository = complaintTypeRepository;
            _complaintStatusRepository = complaintStatusRepository;
            _roleRepository = roleRepository;
            _env = env;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<ComplaintResponseDto>> GetAllComplaintsAsync()
        {
            return await _complaintRepository.GetAllComplaintsWithDetailsAsync();
        }

        public async Task<List<SimpleComplaintDto>> GetRawComplaintsByUserIdAsync(int userId)
        { 
           return await _complaintRepository.GetComplaintsByUserIdAsync(userId);
        }

        public async Task<bool> UpdateComplaintStatusAsync(int complaintId, int status)
        {
            var complaintToUpdate = await _complaintRepository.GetComplaintByIdAsync(complaintId);
            if (complaintToUpdate == null)
            {
                return false;
            }

            complaintToUpdate.Status = status;
            complaintToUpdate.ModifiedDate = DateTime.UtcNow; // Update modified date

            _complaintRepository.UpdateComplaint(complaintToUpdate); // Mark as modified
            await _complaintRepository.SaveChangesAsync(); // Save changes to the database

            return true;
        }

        public async Task RegisterComplaintAsync(RegisterComplaintRequest request)
        {
            var newComplaint = new complaint
            {
                WardID = request.WardID,
                GeoLat = request.GeoLat,
                GeoLong = request.GeoLong,
                Description = request.Description,
                ComplaintTypeID = request.ComplaintTypeID,
                Status = 1, // Default status for a new complaint (e.g., "Pending")
                CreatedDate = DateTime.UtcNow,
                ActiveStatus = true,
                // UserID can be obtained from JWT token if authenticated user is registering
            };

            // --- Extract claims from the authenticated user ---
            var currentUser = _httpContextAccessor.HttpContext?.User;

            // 1. Extract RoleId for CreatedBy field
            var roleIdClaim = currentUser.FindFirst("RoleId"); // Access the custom "RoleId" claim
            if (roleIdClaim != null && !string.IsNullOrEmpty(roleIdClaim.Value))
            {
                // Set the string value of RoleId to CreatedBy
                //IRole is called to get the string value here for particualr role id
                var roleDtoObj = await _roleRepository.GetRoleByIdAsync(int.Parse(roleIdClaim.Value));
                newComplaint.CreatedBy = roleDtoObj.RoleName;
            }

            // 2. Extract UserID (from "UserId" claim)
            var userIdClaim = currentUser.FindFirst("UserId"); // Access the custom "UserId" claim
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int parsedUserId))
            {
                newComplaint.UserID = parsedUserId;
            }


            // Handle optional image uploads
            if (request.Image1 != null)
                newComplaint.Image1 = await SaveImageAsync(request.Image1);
            if (request.Image2 != null)
                newComplaint.Image2 = await SaveImageAsync(request.Image2);
            if (request.Image3 != null)
                newComplaint.Image3 = await SaveImageAsync(request.Image3);

            await _complaintRepository.AddComplaintAsync(newComplaint);
            await _complaintRepository.SaveChangesAsync(); // Save the new complaint to the database
        }

        public async Task<bool> SoftDeleteComplaintAsync(int complaintId)
        {
            var success = await _complaintRepository.SoftDeleteComplaintAsync(complaintId);
            if (success)
            {
                await _complaintRepository.SaveChangesAsync(); // Save changes after soft delete operation
            }
            return success;
        }

        public async Task<IEnumerable<SimpleComplaintDto>> GetComplaintsByStatusIdAsync(int statusId)
        {
            return await _complaintRepository.GetComplaintsByStatusIdAsync(statusId);
        }

        public async Task<IEnumerable<complainttype>> GetAllComplaintTypesAsync()
        {
            return await _complaintTypeRepository.GetAllComplaintTypesAsync();
        }

        public async Task<IEnumerable<ComplaintTypeStatsDto>> GetComplaintTypeStatsAsync()
        {
            return await _complaintTypeRepository.GetComplaintTypeStatsAsync();
        }

        public async Task<IEnumerable<complaintstatus>> GetAllStatusesAsync()
        {
            return await _complaintStatusRepository.GetAllComplaintStatusesAsync();
        }

        public async Task<ComplaintStatsDto> GetOverallComplaintStatsAsync()
        {
            return await _complaintStatusRepository.GetComplaintStatusStatsAsync();
        }

        private async Task<string> SaveImageAsync(IFormFile file)
        {
            // Ensure the web root path is correctly obtained
            var folderPath = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "uploads");

            // Create directory if it doesn't exist
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var fullPath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return a relative path or URL that can be stored in the database and accessed by the client
            return $"/uploads/{fileName}";
        }
    }
}

