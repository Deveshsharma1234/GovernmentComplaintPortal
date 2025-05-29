using ComplaintPortal.Attributes;
using ComplaintPortal.Business.Classes;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Helpers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(PolicyName = "policy1")]
    public class UserController : ControllerBase
    {
        public readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }


        // GET: api/<UserController>
        [HttpGet("all")] // Route: api/User/all
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userService.GetAllUser();
            return Ok(new { message = "users", users });

        }

        [HttpGet("profile")] // Route: api/User/profile
        [RoleAuthorize(1,2,3,4)] // example for citizen role
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.GetUserIdFromClaims();
            var user = await userService.GetUserByUserId(userId);
            return Ok(new { message = "user", user });

        }
        [HttpDelete("{userID}")]
        public async Task<IActionResult> DeleteUser(int userID)
        {
            var user = userService.DeleteUser(userID);
            return Ok(new { message = "user deleted succesfully", user });
        }



        [HttpPatch()]
        public async Task<ActionResult<UserResponseDto>> UpdateProfile( [FromBody] UserUpdateDto updateUser)
        {
            try
            {
                var userId = User.GetUserIdFromClaims();

                var updatedUser = await userService.UpdateProfile(updateUser, userId);
                return Ok(updatedUser);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the profile.", details = ex.Message });
            }
        }



    }
}
