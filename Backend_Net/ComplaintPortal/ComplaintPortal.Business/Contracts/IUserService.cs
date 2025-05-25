using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Business.Contracts
{
   public interface IUserService
    {
        Task<List<UserResponseDto>> GetAllUser();

        Task<UserResponseDto> GetUserByUserId(int UserId);

        Task<UserResponseDto> GetProfile(int UserId);

        Task<UserResponseDto> UpdateProfile(UserUpdateDto updateUser, int UserId);

        Task<user> DeleteUser(int UserId);
    }
}
