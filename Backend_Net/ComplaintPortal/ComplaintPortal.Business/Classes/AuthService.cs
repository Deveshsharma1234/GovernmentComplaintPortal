using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Helper;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Business.Classes
{
    public class AuthService : IAuthService
    {

        public readonly IUserRepository userRepo;
        private readonly JwtConfig _jwtConfig;  //jwt service obj.


        //AuthServie ctor
        public AuthService(IUserRepository userRepo, JwtConfig jwtConfig)
        {
            this.userRepo = userRepo;
            _jwtConfig = jwtConfig;
        }

        public async Task<LoginResponseDto> LoginAsync(LoginDto loginDto)
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

            // Generate and return the JWT token
            var token = await GenerateTokenAsync(user.Email, user.UserId, user.RoleId);

            return new LoginResponseDto
            {
                Token = token,
                User = user
               
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
                    //ActiveState = true as its default value is true or 1 already
                    ActiveState = 1
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
        //Converting Hash to human redable format 
        private bool VerifyPassword(string password, string hashedPassword)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var computedHash = Convert.ToBase64String(bytes);
                return computedHash == hashedPassword;
            }
        }



        public async Task<string> GenerateTokenAsync(string email, int crewId, int ? roleId)
        {
            return await Task.FromResult(_jwtConfig.GenerateToken( email, crewId, roleId));
        }

        #endregion
    }
}
