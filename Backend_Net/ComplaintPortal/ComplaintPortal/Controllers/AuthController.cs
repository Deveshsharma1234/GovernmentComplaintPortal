using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.Entities.DTO;
using Microsoft.AspNetCore.Authorization;
namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }




        [HttpPost("citizen-register")]
        public async Task<IActionResult> RegisterCitizen(RegisterCitizenDto dto)
        {
            try
            {
                var user = await _service.RegisterCitizenAsync(dto);
                return Ok(new { message = "User Created Successfully", user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("admin/register")]
        //[Authorize(Roles = "Admin")] // Requires JWT middleware config
        public async Task<IActionResult> RegisterAdmin(RegisterAdminDto dto)
        {
            try
            {
                var user = await _service.RegisterAdminAsync(dto);
                return Ok(new { message = "Admin Created Successfully", user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }




    }
}
