using ComplaintPortal.Attributes;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Helper;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.DTO.RequestDtos;
using ComplaintPortal.Entities.DTO.ResponseDtos;
using ComplaintPortal.Entities.Helpers;
using ComplaintPortal.Entities.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace ComplaintPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(PolicyName = "policy1")]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;
        private readonly JwtSettings _jwtSettings;
        private readonly IUserService _userService;
        private readonly IRefreshTokenService _refreshTokenService;

        public AuthController(IAuthService authService, JwtSettings jwtSettings,
            IRefreshTokenService refreshTokenService, IUserService userService)
        {
            _authService = authService;
            _jwtSettings = jwtSettings;
            _userService = userService;
            _refreshTokenService = refreshTokenService;
        }



        //Register Citizen
        [HttpPost("/api/citizen-register")]
        public async Task<IActionResult> RegisterCitizen([FromBody] RegisterCitizenDto dto)
        {
            try
            {
                var user = await _authService.RegisterCitizenAsync(dto);
                return Ok(new { message = "User Created Succesfull", user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Registeration of Govt. Employee, Govt Representative only by admin
        [HttpPost("/api/admin/register")]
        //[Authorize(Roles = "Admin")] // Requires JWT middleware config
        [RoleAuthorize(1)] //only role id 1 admin
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterAdminDto dto)
        {
            try
            {
                var user = await _authService.RegisterAdminAsync(dto);
                return Ok(new { message = "User Created Succesfull", user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



        // Login
        [HttpPost("/api/login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                if (loginDto == null)
                {
                    return BadRequest(new Dictionary<string, object> { { "Message", "Invalid request payload." } });
                }

                var tokenResponseFromService = await _authService.LoginAsync(loginDto);

                // 4. Set Access Token as HttpOnly Cookie
                Response.Cookies.Append("token", tokenResponseFromService.Token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true, // Use 'true' in production with HTTPS
                    SameSite = SameSiteMode.Strict, // Crucial for CSRF protection
                    Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes)
                });

                // 5. Set Refresh Token as HttpOnly Cookie (Recommended)
                Response.Cookies.Append("refreshToken", tokenResponseFromService.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true, // Use 'true' in production with HTTPS
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutesRefresh)
                });

                var userResponse = tokenResponseFromService.UserResponse;

                return Ok(new Dictionary<string, object> { { "user", userResponse } });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new Dictionary<string, object> { { "Message", ex.Message } }); // Email not found
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new Dictionary<string, object> { { "Message", ex.Message } }); // Incorrect password
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new Dictionary<string, object> { { "Message", ex.Message } });// Invalid request payload
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Dictionary<string, string> { { "Message", "An unexpected error occurred." }, { "Exception", ex.ToString() } });
            }
        }

        #region TOKEN REFRESH refresh-token
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            // 1. Read Refresh Token from Cookie (most secure)
            string refreshTokenFromCookie = Request.Cookies["refreshToken"]!;

            if (string.IsNullOrEmpty(refreshTokenFromCookie))
            {
                return BadRequest(new { message = "Refresh token not found in cookies." });
            }

            //// 2. Find Refresh Token in Database
            var storedRefreshTokenObj = await _refreshTokenService.FindRefreshTokenService(refreshTokenFromCookie);


            if (storedRefreshTokenObj == null || !storedRefreshTokenObj.IsActive)
            {
                // Token not found, expired, or revoked
                return Unauthorized(new { message = "Invalid or expired refresh token. Please log in again." });
            }


            // 3. Find the associated user
            var user = await _userService.GetUserByUserId(storedRefreshTokenObj.UserId);
            if (user == null)
            {
                // Should not happen if DB integrity is maintained, but good to check
                return Unauthorized(new { message = "User associated with refresh token not found." });
            }

            // Optional: Revoke the old refresh token (for one-time use or rotation)
            // This is a common security practice to prevent replay attacks
            storedRefreshTokenObj.Revoked = DateTime.UtcNow;

            _refreshTokenService.UpdateRefreshTokenService(storedRefreshTokenObj);
            //==================================================================
            // 4. Generate New Access Token and New Refresh Token

            var newTokenRefreshTokenDtoObj = await _authService.GenerateToken(user.Email, user.UserId, user.RoleId);
            var newRefreshTokenEntity = new RefreshToken
            {
                Token = newTokenRefreshTokenDtoObj.refreshToken,
                UserId = user.UserId,
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutesRefresh),
                Created = DateTime.UtcNow
            };
            await _refreshTokenService.SaveRefreshTokenEntityService(newRefreshTokenEntity);


            // 5. Set New Access Token and New Refresh Token as HttpOnly Cookies
            Response.Cookies.Append("token", newTokenRefreshTokenDtoObj.token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes)
            });

            Response.Cookies.Append("refreshToken", newTokenRefreshTokenDtoObj.refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutesRefresh)
            });

            // 6. Return success
            //return Ok(new RefreshTokenResponse
            //{
            //    AccessToken = newTokenRefreshTokenDtoObj.token, // You can return it in body if needed for some frontend logic, but cookies are primary
            //    RefreshToken = newTokenRefreshTokenDtoObj.refreshToken // Same as above
            //});
            return Ok();
        }
        #endregion

        //[RoleAuthorize(1,2,3,4)]
        //[HttpPost("/api/logout")]
        //public async Task<IActionResult> Logout()
        //{
        //    try
        //    {
        //        Response.Cookies.Delete("token");
        //        return Ok(new Dictionary<string, string> { { "message" ,"LogedOut" } });
        //    }catch(Exception ex)
        //    {
        //        return StatusCode(500, new Dictionary<string, string> { { "Message", ex.Message } });
        //    }

        //}


        [RoleAuthorize(1, 2, 3, 4)] // Ensure only authenticated users can logout, if desired
        [HttpPost("/api/logout")]
        public async Task<IActionResult> Logout()
        {
            var userId = User.GetUserIdFromClaims(); // Use your extension method

            // Clear cookies on client side
            Response.Cookies.Delete("token", new CookieOptions { HttpOnly = true, Secure = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Delete("refreshToken", new CookieOptions { HttpOnly = true, Secure = true, SameSite = SameSiteMode.Strict });

            await _refreshTokenService.RevokeRefreshTokenService(userId);

            return Ok(new { message = "Successfully logged out." });
        }
    }
}
