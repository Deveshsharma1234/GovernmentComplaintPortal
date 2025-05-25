﻿using ComplaintPortal.Business.Classes;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.Entities.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }


        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userService.GetAllUser();
            return Ok(new { message = "users", users });

        }

        [HttpGet("{userID}")]
        public async Task<IActionResult> GetUserById(int userID)
        {
            var user = await userService.GetUserByUserId(userID);
            return Ok(new { message = "user", user });

        }
        [HttpDelete("{userID}")]
        public async Task<IActionResult> DeleteUser(int userID)
        {
            var user = userService.DeleteUser(userID);
            return Ok(new { message = "user deleted succesfully", user });
        }



        [HttpPatch("{userId}")]
        public async Task<ActionResult<UserResponseDto>> UpdateProfile(int userId, [FromBody] UserUpdateDto updateUser)
        {
            try
            {
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
