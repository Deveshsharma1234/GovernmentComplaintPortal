using ComplaintPortal.Attributes;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(PolicyName = "policy1")]
    public class PingController : ControllerBase
    {
        [HttpGet]
        public  IActionResult Ping()
        {
            return Ok( new { message= "This is To test Ping controller"});
        }
        [HttpGet("pingWithAuth")]
        [RoleAuthorize(1,2,3,4)]
        public IActionResult PingWithAuth()
        {
            return Ok(new { message = "Cookies Are There" });
        }
    }
}
