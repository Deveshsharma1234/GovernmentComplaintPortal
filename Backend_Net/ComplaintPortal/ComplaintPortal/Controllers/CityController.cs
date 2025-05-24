using ComplaintPortal.Business.Contracts;

using Microsoft.AspNetCore.Mvc;

namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityService cityService;


        public CityController(ICityService cityService)
        {
            this.cityService = cityService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await cityService.GetAllCities();
            return Ok(new { message = "cities", cities});
        }

        [HttpGet("{districtId}")]
        public async Task<IActionResult> GetCitiesByDistrictId(int districtId)
        {
            var cities = await cityService.CitiesByDistrictId(districtId);

            return Ok(new { message = "cities", cities });
        }
    }
}
