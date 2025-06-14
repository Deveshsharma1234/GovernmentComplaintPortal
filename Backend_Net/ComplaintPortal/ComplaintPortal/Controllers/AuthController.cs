using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.Entities.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using ComplaintPortal.Attributes;
namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(PolicyName = "policy1")]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }



        //Register Citizen
        [HttpPost("/api/citizen-register")]
        public async Task<IActionResult> RegisterCitizen([FromBody]RegisterCitizenDto dto)
        {
            try
            {
                var user = await _service.RegisterCitizenAsync(dto);
                return Ok(new { message = "User Created Succesfull", user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Registeration of Govt. Employee, Govt Representative only by admin
        [HttpPost("/api/admin/register")]
        //[Authorize(Roles = "Admin")] // Requires JWT middleware config
        [RoleAuthorize(1)] //only role id 1 admin
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterAdminDto dto)
        {
            try
            {
                var user = await _service.RegisterAdminAsync(dto);
                return Ok(new { message = "User Created Succesfull", user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



        // Login
        [HttpPost("/api/login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                if (loginDto == null)
                {
                    return BadRequest(new Dictionary<string, object> { { "Message", "Invalid request payload." } });
                }

                var res = await _service.LoginAsync(loginDto);
                // Set cookie options
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // Set true in production (HTTPS)
                    SameSite = SameSiteMode.Lax, // or SameSiteMode.None for cross-origin
                    Path = "/",
                    Expires = DateTime.UtcNow.AddHours(2)
                };

                // Set cookie in the response
                Response.Cookies.Append("token", res.Token, cookieOptions);

                return Ok(new Dictionary<string, object> { { "user", res.User } });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new Dictionary<string, object> { { "Message", ex.Message } }); // Email not found
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new Dictionary<string, object> { { "Message", ex.Message } }); // Incorrect password
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new Dictionary<string, object> { { "Message", ex.Message } });// Invalid request payload
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Dictionary<string, string> { { "Message", "An unexpected error occurred." } });
            }
        }


        [HttpPost("/api/logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                Response.Cookies.Delete("token");
                return Ok(new Dictionary<string, string> { { "message" ,"LogedOut" } });
            }catch(Exception ex)
            {
                return StatusCode(500, new Dictionary<string, string> { { "Message", ex.Message } });
            }

        }
    }
}
