using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;
using Microsoft.AspNetCore.SignalR;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
   public  interface IUserRepository
    {
        Task<user> GetByEmailAndPasswordAsync(string email, string password);

        Task<user> AddUserAsync(user user);

        Task<user> GetUserByEmailAsync(string userEmail);

        Task<List<UserResponseDto>> GetAllUser();

        Task<UserResponseDto> GetUserByUserId(int UserId);

        Task<UserResponseDto> GetProfile(int UserId);

        Task<UserResponseDto> UpdateProfile( UserUpdateDto updateUser,int UserId);

        Task<user> DeleteUser(int UserId);






    }
}
