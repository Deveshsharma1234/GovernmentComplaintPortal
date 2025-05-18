using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PingController : ControllerBase
    {
        [HttpGet]
        public  IActionResult Ping()
        {
            return Ok( new { message= "This is To test Ping controller"});
        }
    }
}
