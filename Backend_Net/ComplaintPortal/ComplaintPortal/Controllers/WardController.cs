using ComplaintPortal.Business.Contracts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(PolicyName = "policy1")]
    public class WardController : ControllerBase
    {
        public readonly IWardService wardService;

        public WardController(IWardService wardService)
        {
            this.wardService = wardService;
        }

        [HttpGet]
        public async Task<IActionResult> GetWards()
        {
            var wards =  await wardService.GetWards();

            return Ok(new { message = "wards", wards });
        }
        [HttpGet("{CityId}")]
        public async Task<IActionResult> GetWardsByCityId( int CityId)
        {
            var wards = await wardService.GetWardsByCity(CityId);
            return Ok(new { message = "wards", wards });
        }
    }
}
