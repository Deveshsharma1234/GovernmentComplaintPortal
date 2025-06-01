using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO.ResponseDtos;
using ComplaintPortal.Entities.EFCore;
using ComplaintPortal.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Business.Classes
{
    public class RoleService : IRoleService
    {
        private readonly AppDbContext appDbContext;
        private readonly IRoleRepository roleRepository;

        public RoleService(AppDbContext appDbContext,IRoleRepository roleRepository)
        {
            this.appDbContext = appDbContext;
            this.roleRepository = roleRepository;
        }
        public async Task<RoleNameDto> GetRoleName(int RoleId)
        {
           return await this.roleRepository.GetRoleByIdAsync(RoleId);
        }

    }
}
