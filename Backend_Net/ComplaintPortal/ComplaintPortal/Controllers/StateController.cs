using ComplaintPortal.Business.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        public readonly IStateService stateService;
        public StateController(IStateService stateService)
        {
            this.stateService = stateService;
        }
        [HttpGet]
      public  async Task  <IActionResult> GetState()
        {
            var States = stateService.GetStates();
            return Ok(new { message = "states", States });

        }
    }
}
