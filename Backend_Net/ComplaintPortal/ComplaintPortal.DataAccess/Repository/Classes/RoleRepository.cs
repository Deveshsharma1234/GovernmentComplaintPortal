using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.DTO.ResponseDtos;
using ComplaintPortal.Entities.EFCore;
using ComplaintPortal.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace ComplaintPortal.DataAccess.Repository.Classes
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AppDbContext _appDbContext;
        public RoleRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<RoleNameDto> GetRoleByIdAsync(int RoleId)
        {
            var role = await _appDbContext.roles.Where(roles => roles.RoleId == RoleId)
                                             .Select(role => new RoleNameDto
                                             {
                                                 //role name dto obj     //c which is roles here
                                                 RoleName = role.Role
                                             }).FirstOrDefaultAsync();
            return role == null ? 
                throw new KeyNotFoundException($"Role with ID {RoleId} not found.") : role;
        }
    }
}
