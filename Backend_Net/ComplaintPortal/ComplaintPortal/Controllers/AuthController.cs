using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ComplaintPortal.Business.Contracts;
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
    }
}
