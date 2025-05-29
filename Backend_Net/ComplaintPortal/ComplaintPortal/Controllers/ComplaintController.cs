using ComplaintPortal.Attributes;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Helpers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")] // Preferred route for controllers, defaults to /api/Complaint
    [ApiController]
    [EnableCors(PolicyName = "policy1")]
    public class ComplaintController : ControllerBase
    {
        private readonly IComplaintService _complaintService;

        public ComplaintController(IComplaintService complaintService)
        {
            _complaintService = complaintService;
        }

        // --- Complaint Management Endpoints ---

        [HttpGet("/api/complaints")] // GET /api/Complaint
        [RoleAuthorize(1, 2, 3)] // Adjust roles as per your authorization logic
        public async Task<IActionResult> GetAllComplaints()
        {
            var complaints = await _complaintService.GetAllComplaintsAsync();
            if (complaints == null || complaints.Count == 0)
            {
                return Ok(new { message = "No complaints found.", complaints = new List<ComplaintResponseDto>() });
            }
            return Ok(new { message = "Complaints retrieved successfully", complaints });
        }

        [HttpGet("mycomplaints")] // GET /api/Complaint/mycomplaints
        [RoleAuthorize(1, 2, 3, 4)]
        public async Task<IActionResult> GetMyComplaints()
        {
            // Ensure User.GetUserIdFromClaims() correctly extracts the user ID from the JWT token.
            // This method would likely be an extension method defined elsewhere.
            var userId = User.GetUserIdFromClaims();
            if (userId == 0) // Assuming 0 or some other value indicates user ID not found
            {
                return Unauthorized(new { message = "User ID not found in claims." });
            }

            var complaints = await _complaintService.GetRawComplaintsByUserIdAsync(userId);
            if (complaints == null || complaints.Count == 0)
            {
                return Ok(new { message = "No complaints found for this user.", complaints = new List<SimpleComplaintDto>() });
            }
            return Ok(new { message = "User complaints retrieved successfully", complaints });
        }

        [HttpGet("by-status/{statusId}")] // GET /api/Complaint/by-status/{statusId}
        [RoleAuthorize(1, 2, 3)]
        public async Task<IActionResult> GetComplaintsByStatus(int statusId)
        {
            var complaints = await _complaintService.GetComplaintsByStatusIdAsync(statusId);
            if (complaints == null || !((List<SimpleComplaintDto>)complaints).Any())
            {
                return NotFound(new { message = $"No complaints found with status ID {statusId}." });
            }
            return Ok(new { message = $"Complaints with status ID {statusId} retrieved successfully", complaints });
        }


        [HttpPost("/api/complaints")] // POST /api/Complaint
        [RoleAuthorize(1,2,3,4)] 
        public async Task<IActionResult> RegisterComplaint([FromForm] RegisterComplaintRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // You might want to get the UserID and CreatedBy from the authenticated user's claims here
            // request.UserID = User.GetUserIdFromClaims(); // Example
            // request.CreatedBy = User.Identity.Name; // Example

            await _complaintService.RegisterComplaintAsync(request);
            return StatusCode(201, new { message = "Complaint registered successfully!" }); // Use 201 Created status
        }

        [HttpPatch("{complaintId}/status")] // PATCH /api/Complaint/{complaintId}/status
        [RoleAuthorize(2, 3)] // Roles like Admin (2) or Municipality Employee (3) can update status
        public async Task<IActionResult> UpdateComplaintStatus(int complaintId, [FromBody] UpdateComplaintStatusRequest request)
        {
            if (request.ComplaintId != complaintId)
            {
                return BadRequest(new { message = "Complaint ID in route does not match body." });
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _complaintService.UpdateComplaintStatusAsync(request.ComplaintId, request.Status);
            if (result)
            {
                return Ok(new { message = "Complaint status updated successfully." });
            }
            else
            {
                return NotFound(new { message = "Complaint not found or status update failed." });
            }
        }

        [HttpDelete("{complaintId}")] // DELETE /api/Complaint/{complaintId}
        [RoleAuthorize(1, 2)] // Only highly privileged roles (e.g., SuperAdmin, Admin) can soft delete
        public async Task<IActionResult> SoftDeleteComplaint(int complaintId)
        {
            var result = await _complaintService.SoftDeleteComplaintAsync(complaintId);
            if (result)
            {
                return Ok(new { message = "Complaint soft-deleted successfully (status changed to invalid and active status set to false)." });
            }
            else
            {
                return NotFound(new { message = "Complaint not found or could not be soft-deleted." });
            }
        }

        // --- Complaint Type Endpoints ---

        [HttpGet("types")] // GET /api/Complaint/types
        public async Task<IActionResult> GetAllComplaintTypes()
        {
            var types = await _complaintService.GetAllComplaintTypesAsync();
            if (types == null || !((List<Entities.Models.complainttype>)types).Any())
            {
                return Ok(new { message = "No complaint types found.", types = new List<Entities.Models.complainttype>() });
            }
            return Ok(new { message = "Complaint types retrieved successfully", types });
        }

        [HttpGet("/api/complaint-types/stats")] // GET /api/Complaint/types/stats
        [RoleAuthorize(1, 2, 3)] // Example: Admins/employees can see stats
        public async Task<IActionResult> GetComplaintTypeStatistics()
        {
            var stats = await _complaintService.GetComplaintTypeStatsAsync();
            if (stats == null || !((List<ComplaintTypeStatsDto>)stats).Any())
            {
                return Ok(new { message = "No complaint type statistics available.", stats = new List<ComplaintTypeStatsDto>() });
            }
            return Ok(new { message = "Complaint type statistics retrieved successfully", stats });
        }

        // --- Complaint Status Endpoints ---

        [HttpGet("/api/statuses")] // GET /api/Complaint/statuses
        public async Task<IActionResult> GetAllComplaintStatuses()
        {
            var statuses = await _complaintService.GetAllStatusesAsync();
            if (statuses == null || !((List<Entities.Models.complaintstatus>)statuses).Any())
            {
                return Ok(new { message = "No complaint statuses found.", statuses = new List<Entities.Models.complaintstatus>() });
            }
            return Ok(new { message = "Complaint statuses retrieved successfully", statuses });
        }

        [HttpGet("stats")] // GET /api/Complaint/stats
        [RoleAuthorize(1, 2, 3)] // Example: Admins/employees can see overall stats
        public async Task<IActionResult> GetOverallComplaintStatistics()
        {
            var stats = await _complaintService.GetOverallComplaintStatsAsync();
            if (stats == null) // ComplaintStatsDto will always be non-null but its inner lists might be empty
            {
                return Ok(new { message = "No overall complaint statistics available.", stats = new ComplaintStatsDto() });
            }
            return Ok(new { message = "Overall complaint statistics retrieved successfully", stats });
        }
    }
}
