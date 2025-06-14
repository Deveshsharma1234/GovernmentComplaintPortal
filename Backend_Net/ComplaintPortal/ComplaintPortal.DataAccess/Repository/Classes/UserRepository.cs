using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.EFCore;
using ComplaintPortal.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace ComplaintPortal.DataAccess.Repository.Classes
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<user> AddUserAsync(user user)
        {
            await _context.users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<user> DeleteUser(int UserId)
        {
            user user = await _context.users.FindAsync(UserId);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with ID {UserId} was not found.");
            }
            user.ActiveState = false; 
            _context.users.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<List<UserResponseDto>> GetAllUser()
        {
            return await _context.users.Where(u => u.ActiveState == true).Select(u => new UserResponseDto
            {
                Address = u.Address,
                City = u.City,
                District = u.District,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Phone = u.Phone,
                Pincode= u.Pincode,
                RoleId = u.RoleId,
                State = u.State,
                UserId = u.UserId
                
            }).ToListAsync();
        }

        public async Task<user> GetByEmailAndPasswordAsync(string email, string password)
        {
            return await _context.users
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password); // This now works with the added using directive
        }

        public Task<UserResponseDto> GetProfile(int UserId)
        {
            throw new NotImplementedException();
        }

        public async Task<user> GetUserByEmailAsync(string userEmail)
        {
            return await _context.users.FirstOrDefaultAsync(u => u.Email == userEmail);
        }

        public async Task<UserResponseDto> GetUserByUserId(int UserId)
        {
            return await _context.users.Where(u => u.UserId == UserId).Select(u => new UserResponseDto
            {
                 Address = u.Address,
                City = u.City,
                District = u.District,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Phone = u.Phone,
                Pincode= u.Pincode,
                RoleId = u.RoleId,
                State = u.State,
                UserId = u.UserId




            }).FirstOrDefaultAsync();



        }

        public async Task<UserResponseDto> UpdateProfile(UserUpdateDto updateUser, int userId)
        {
            var u = await _context.users.FindAsync(userId);
            if (u == null)
            {
                throw new KeyNotFoundException($"User with ID {userId} was not found.");
            }

            // Map fields from DTO to entity
        
            u.FirstName = updateUser.FirstName;
            u.LastName = updateUser.LastName;
            u.Address = updateUser.Address;
            u.Pincode = updateUser.Pincode;
            u.Phone = updateUser.Phone;
            u.State = updateUser.State;
            u.District = updateUser.District;
            u.City = updateUser.City;



            await _context.SaveChangesAsync();

            // Return updated user as DTO
            return new UserResponseDto
            {
                Address = u.Address,
                City = u.City,
                District = u.District,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Phone = u.Phone,
                Pincode = u.Pincode,
                RoleId = u.RoleId,
                State = u.State,
                UserId = u.UserId,
                ActiveState = u.ActiveState
                // Map other fields as needed...
            };
        }

    }
}
