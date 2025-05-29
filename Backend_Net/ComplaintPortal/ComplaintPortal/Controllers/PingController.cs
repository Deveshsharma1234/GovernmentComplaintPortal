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
    }
}
