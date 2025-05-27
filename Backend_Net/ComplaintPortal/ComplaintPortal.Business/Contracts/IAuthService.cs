using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.Models;
using ComplaintPortal.Entities.DTO;


namespace ComplaintPortal.Business.Contracts
{
   public interface IAuthService
    {
        Task<user> RegisterCitizenAsync(RegisterCitizenDto dto);
        Task<user> RegisterAdminAsync(RegisterAdminDto dto);
        Task<LoginResponseDto> LoginAsync(LoginDto dto);
    }
}
