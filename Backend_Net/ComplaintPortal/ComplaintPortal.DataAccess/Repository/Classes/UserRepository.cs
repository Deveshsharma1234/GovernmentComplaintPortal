using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.DataAccess.Repository.Contracts;
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
            _context.users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<user> GetByEmailAndPasswordAsync(string email, string password)
        {
            return await _context.users
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password); // This now works with the added using directive
        }

        public async Task<user> GetUserByEmailAsync(string userEmail)
        {
            return await _context.users.FirstOrDefaultAsync(u => u.Email == userEmail);
        }
    }
}
