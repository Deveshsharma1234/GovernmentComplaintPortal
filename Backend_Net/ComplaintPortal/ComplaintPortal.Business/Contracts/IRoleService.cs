using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO.ResponseDtos;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.Business.Contracts
{

    public interface IRoleService
    {
        Task<RoleNameDto> GetRoleName(int RoleId);

    }
}
