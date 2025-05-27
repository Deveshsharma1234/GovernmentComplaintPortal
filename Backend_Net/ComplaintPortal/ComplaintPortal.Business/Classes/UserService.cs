using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Business.Classes
{
   public class UserService : IUserService
    {
        public readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<user> DeleteUser(int UserId)
        {
            return await userRepository.DeleteUser(UserId);
        }

        public async Task<List<UserResponseDto>> GetAllUser()
        {
            return await userRepository.GetAllUser();
        }

        public async Task<UserResponseDto> GetProfile(int UserId)
        {
            return await userRepository.GetProfile(UserId);
        }

        public async Task<UserResponseDto> GetUserByUserId(int UserId)
        {
            return await userRepository.GetUserByUserId(UserId);
        }

        public async Task<UserResponseDto> UpdateProfile(UserUpdateDto updateUser, int UserId)
        {
            return await userRepository.UpdateProfile(updateUser, UserId);
        }
    }
}
