using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Business.Classes
{
    public class AuthService : IAuthService
    {

        public readonly IUserRepository userRepo;


        //AuthServie ctor
        public AuthService(IUserRepository userRepo)
        {
            this.userRepo = userRepo;
        }

        public Task<user> LoginAsync(LoginDto dto)
        {
            throw new NotImplementedException();
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

        public Task<user> RegisterCitizenAsync(RegisterCitizenDto dto)
        {
            throw new NotImplementedException();
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


        #endregion
    }
}
