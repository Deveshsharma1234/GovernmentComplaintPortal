using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Helper;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Business.Classes
{
    public class AuthService : IAuthService
    {

        public readonly IUserRepository userRepo;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly JwtConfig _jwtConfig;  //jwt service obj.
        private readonly JwtSettings _jwtSettings;


        //AuthServie ctor
        public AuthService(IUserRepository userRepo, JwtConfig jwtConfig,
            JwtSettings jwtSettings, IRefreshTokenRepository refreshTokenRepository, IRefreshTokenService refreshTokenService)
        {
            this.userRepo = userRepo;
            _jwtConfig = jwtConfig;
            _jwtSettings = jwtSettings;
            _refreshTokenRepository = refreshTokenRepository;
            _refreshTokenService = refreshTokenService;
        }

        public async Task<TokenAndUserResponseDto> LoginAsync(LoginDto loginDto)
        {
            if (loginDto == null || string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Password))
            {
                throw new ArgumentException("Email and Password are required.");
            }

            // Repository method to check if the operator exists
            var user= await userRepo.GetUserByEmailAsync(loginDto.Email);

            if (user == null)
            {
                throw new KeyNotFoundException("Email not found.");
            }

            // Check if the password matches (assuming hashed password in the database)
            bool isPasswordValid = VerifyPassword(loginDto.Password, user.Password);
            if (!isPasswordValid)
            {
                throw new UnauthorizedAccessException("Invalid password.");
            }

            //// Generate tokens and return the JWT token
            var tokenRefreshTokenDtoObj = await GenerateToken(user.Email, user.UserId, user.RoleId);

           
            
            // 4.Storing it to the table by calling refreshtoken repo 
            //Because its an random string of base64 so needed to be stored at 
            await _refreshTokenService.SaveRefreshTokenService(tokenRefreshTokenDtoObj.refreshToken,user);

            var userResponseDto = new UserResponseDto
            {
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Address = user.Address,
                State = user.State,
                District = user.District,
                City = user.City,
                RoleId = user.RoleId,
                ActiveState = user.ActiveState
            };

            // 6. Return response (optional: send user details in body)
            return new TokenAndUserResponseDto
            {
                 UserResponse = userResponseDto,
                // Do NOT send tokens in the body if you're using HttpOnly cookies exclusively
                //But we are just sending it to controller only
                Token = tokenRefreshTokenDtoObj.token,
                RefreshToken = tokenRefreshTokenDtoObj.refreshToken,
            };
        }

        public async Task<user> RegisterAdminAsync(RegisterAdminDto dto)
        {
            try
            {
                var existingUser = await userRepo.GetUserByEmailAsync(dto.Email);
                if(existingUser != null)
                {
                    throw new ArgumentException($"This Email '{dto.Email}' is already registered. Please Log In.");
                }
                var passwordHash = HashPassword(dto.Password);

                var newUser = new user
                {
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Email = dto.Email,
                    Phone = dto.Phone,
                    Address = dto.Address,
                    Pincode = dto.Pincode,
                    State = dto.State,
                    District = dto.District,
                    City = dto.City,
                    RoleId = dto.RoleId,
                    Password = passwordHash,
                    ActiveState = true //as its default value is true or 1 already
                    //ActiveState = 1
                };
                return await userRepo.AddUserAsync(newUser);

            }
            catch (ArgumentException ex)
            {
                // Log error (if logging is set up)
                // Return meaningful error message to the caller
                throw new InvalidOperationException(ex.Message);
            }
            catch (Exception ex)
            {
                // Handle unexpected exceptions
                throw new InvalidOperationException("An error occurred while registering the crew operator.", ex);

            }
        }

        public async Task<user> RegisterCitizenAsync(RegisterCitizenDto dto)
        {

            try
            {
                var existingUser = await userRepo.GetUserByEmailAsync(dto.Email);
                if (existingUser != null)
                {
                    throw new ArgumentException($"This Email '{dto.Email}' is already registered. Please Log In.");
                }
                var passwordHash = HashPassword(dto.Password);

                var newUser = new user
                {
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Email = dto.Email,
                    Phone = dto.Phone,
                    Address = dto.Address,
                    Pincode = dto.Pincode,
                    State = dto.State,
                    District = dto.District,
                    City = dto.City,
                    RoleId = 4,
                    Password = passwordHash
                };
                return await userRepo.AddUserAsync(newUser);

            }
            catch (ArgumentException ex)
            {
                // Log error (if logging is set up)
                // Return meaningful error message to the caller
                throw new InvalidOperationException(ex.Message);
            }
            catch (Exception ex)
            {
                // Handle unexpected exceptions
                throw new InvalidOperationException("An error occurred while registering the crew operator.", ex);

            }

        }



        #region Helper Methods
        // Password Hashing
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }
        //Comparing Hash to human redable format 
        private static bool VerifyPassword(string password, string hashedPassword)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var computedHash = Convert.ToBase64String(bytes);
                return computedHash == hashedPassword;
            }
        }

        public Task<TokenAndRefreshTokenDto> GenerateToken(string email, int userId, int? roleId)
        {
            var accessToken = _jwtConfig.GenerateAccessToken(email, userId, roleId);

            //// 3. Generate and Store Refresh Token
            var refreshTokenString = _jwtConfig.GenerateRefreshToken();

            return Task.FromResult(new TokenAndRefreshTokenDto
            {
                token = accessToken,
                refreshToken = refreshTokenString
            });

        }

        #endregion
    }
}
