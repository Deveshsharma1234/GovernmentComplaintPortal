using ComplaintPortal.Attributes;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.DTO.RequestDtos;
using ComplaintPortal.Entities.Helpers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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
                return NoContent();
            }
            //return Ok(new { message = "Complaints retrieved successfully", complaints });
            return Ok(new {complaints});
        }

        [HttpGet("/api/myComplaints")] // GET /api/Complaint/mycomplaints
        [RoleAuthorize(1, 2, 3, 4)]
        public async Task<IActionResult> GetMyComplaints()
        {
            //  User.GetUserIdFromClaims() extracts the user ID from the JWT token.
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

            await _complaintService.RegisterComplaintAsync(request);
            return StatusCode(201, new { message = "Complaint registered successfully" }); // Use 201 Created status
            
        }

        [HttpPatch("/api/complaints")] // PATCH /api/Complaint/{complaintId}/status
        [RoleAuthorize(1,2, 3)] // Roles like Admin (2) or Municipality Employee (3) can update status
        public async Task<IActionResult> UpdateComplaintStatus([FromBody] UpdateComplaintStatusRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _complaintService.UpdateComplaintStatusAsync(request.Id, request.Status);
            if (result)
            {
                return Ok(new { message = "Complaint status updated successfully." });
            }
            else
            {
                return NotFound(new { message = "Complaint not found or status update failed." });
            }
        }

        [HttpDelete("/api/complaints")] // DELETE /api/Complaint/{complaintId}
        [RoleAuthorize(1, 2)] // Only highly privileged roles (e.g., SuperAdmin, Admin) can soft delete
        public async Task<IActionResult> SoftDeleteComplaint([FromBody] DeleteReqDto deleteReqDto)
        {
            if(!ModelState.IsValid)
                { return BadRequest(ModelState); }

            var result = await _complaintService.SoftDeleteComplaintAsync(deleteReqDto.ComplaintId);
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

        [HttpGet("/api/complaints/types")] // GET /api/Complaint/types
        public async Task<IActionResult> GetAllComplaintTypes()
        {
            var types = await _complaintService.GetAllComplaintTypesAsync();
            if (types == null || !((List<Entities.Models.complainttype>)types).Any())
            {
                return Ok(new { message = "No complaint types found.", types = new List<Entities.Models.complainttype>() });
            }
            return Ok(new { message = "Complaint types retrieved successfully", types });
        }

        // --- Complaint Status Endpoints ---
        [HttpGet("/api/complaint-types/stats")] // GET /api/Complaint/types/stats
        [RoleAuthorize(1, 2, 3)] // Example: Admins/employees can see stats
        public async Task<IActionResult> GetComplaintTypeStatistics()
        {
            var status = await _complaintService.GetComplaintTypeStatsAsync();
            if (status == null || !((List<ComplaintTypeStatsDto>)status).Any())
            {
                return NoContent();
            }
            return Ok(new {status });
        }


        [HttpGet("/api/statuses")] // GET /api/Complaint/statuses
        public async Task<IActionResult> GetAllComplaintStatuses()
        {
            var status = await _complaintService.GetAllStatusesAsync();
            if (status == null || !((List<Entities.Models.complaintstatus>)status).Any())
            {
                return Ok(new { message = "No complaint statuses found.", statuses = new List<Entities.Models.complaintstatus>() });
            }
            return Ok(new { status });
        }

        [HttpGet("/api/statuses/stats")] // GET /api/Complaint/stats
        [RoleAuthorize(1, 2, 3)] 
        public async Task<IActionResult> GetOverallComplaintStatistics()
        {
            var stats = await _complaintService.GetOverallComplaintStatsAsync();
            if (stats == null) // ComplaintStatsDto will always be non-null but its inner lists might be empty
            {
                return NoContent();
            }
           
                  
            return Ok(new {stats.totalComplaints,stats.statuses});
        }
    }
}
