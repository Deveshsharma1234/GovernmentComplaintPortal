using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComplaintPortal.Entities.DTO.ResponseDtos;
using ComplaintPortal.Entities.Models;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
  public  interface IRoleRepository
    {
        public  Task<RoleNameDto> GetRoleByIdAsync(int RoleId);
    }
}
