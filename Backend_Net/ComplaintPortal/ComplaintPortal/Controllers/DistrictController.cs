using ComplaintPortal.Business.Contracts;
using ComplaintPortal.Entities.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(PolicyName = "policy1")]
    public class DistrictController : ControllerBase
    {
        private readonly IDistrictService districtService;

        public DistrictController(IDistrictService districtService)
        {
            this.districtService = districtService;
        }


        [HttpGet("/getAllDistricts")]
        public async Task<IActionResult> GetAllDistrict()
        {
           var districts =  await districtService.GetAllDistricts();

            return Ok(new { districts });
        }

        [HttpGet("/api/district/{stateId}")]
        public async Task<IActionResult> GetDistrictByStateId(int stateId)
        {
            var districts = await districtService.GetDistrictsByStateId(stateId);
            return Ok(new {  districts });
        }
    }
}
