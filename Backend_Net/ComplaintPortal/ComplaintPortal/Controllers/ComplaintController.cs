
using ComplaintPortal.Attributes;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComplaintPortal.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ComplaintController : ControllerBase
    {


        public readonly IComplaintService complaintService;
        public ComplaintController(IComplaintService complaintService)
        {
            this.complaintService = complaintService;
        }

        [HttpGet("/complaints")]
        [RoleAuthorize(1,2,3)]
        public async Task<IActionResult> GetAllComplaints()
        {
            var complaints = await complaintService.GetAllComplaintsAsync();
            return Ok(new { message = "complaints", complaints });
        }


        [HttpGet("/myComplaints")]
        [RoleAuthorize(1,2,3,4)]
        public async Task <IActionResult> GetAllMyCompliants()
        {
            var userId = User.GetUserIdFromClaims();
            var complaints = await complaintService.GetRawComplaintsByUserIdAsync(userId);
            return Ok(new { message = "complaints", complaints });
        }


        [HttpPatch("/complaints")]
        [RoleAuthorize(2, 3)]
        public async Task<IActionResult> UpdateMyComplaintStatus([FromBody] UpdateComplaintStatusRequest request)
        {
            var result = await complaintService.UpdateComplaintStatusAsync(request.ComplaintId, request.Status);
            if (result)
            {
                return Ok(new { message = "Updated Successfully" });
            }
            else
            {
                return NotFound(new { message = "Complaint not found" });
            }
        }



        [HttpPost("/complaints")]
        public async Task<IActionResult> RegisterComplaint([FromForm] RegisterComplaintRequest request)
        {
            await complaintService.RegisterComplaintAsync(request);
            return Ok(new { message = "Complaint registered successfully!" });
        }




    }
}
