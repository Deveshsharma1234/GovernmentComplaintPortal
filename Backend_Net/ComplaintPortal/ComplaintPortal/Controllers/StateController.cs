using ComplaintPortal.Business.Contracts;
using ComplaintPortal.Entities.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComplaintPortal.Controllers
{
    [Route("api/")]
    [ApiController]
    [EnableCors(PolicyName = "policy1")]
    public class StateController : ControllerBase
    {
        public readonly IStateService stateService;
        public StateController(IStateService stateService)
        {
            this.stateService = stateService;
        }
        [HttpGet("getAllStates")]
      public  async Task  <IActionResult> GetState()
        {
            var States = stateService.GetStates();
            return Ok(new { States.Result });
            //return Ok(new { message = "states", States});

        }
    }
}
