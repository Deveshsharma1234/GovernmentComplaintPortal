using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.Helpers;
using ComplaintPortal.Entities.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace ComplaintPortal.Business.Classes
{
    public class UserClaimsService : IUserClaimsService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IRoleRepository _roleRepository;

        public UserClaimsService(IHttpContextAccessor httpContextAccessor, IRoleRepository roleRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _roleRepository = roleRepository;
        }
        private ClaimsPrincipal CurrentUser => _httpContextAccessor.HttpContext?.User;
        public string GetCurrentUserEmail()
        {
            return CurrentUser?.GetUserEmailOrNull();
        }


        public int? GetCurrentUserId()
        {
            return CurrentUser?.GetUserIdFromClaimsOrNull();
        }

        public int GetCurrentUserIdRequired()
        {
            return CurrentUser?.GetUserIdFromClaims()
                   ?? throw new UnauthorizedAccessException("User is not authenticated");
        }

        public int? GetCurrentUserRoleId()
        {
            return CurrentUser?.GetRoleIdFromClaimsOrNull();
        }

        public async Task<string> GetCurrentUserRoleNameAsync()
        {
            var roleId = CurrentUser?.GetRoleIdFromClaims();

            if (!roleId.HasValue)
                return null;

            var role = await _roleRepository.GetRoleByIdAsync(roleId.Value);
            return role?.RoleName;
        }

        public bool IsCurrentUserAuthenticated()
        {
            return CurrentUser?.IsAuthenticated() ?? false;
        }

        public async Task SetComplaintUserInfoAsync(complaint complaint)
        {
            if (!IsCurrentUserAuthenticated())
                throw new UnauthorizedAccessException("User must be authenticated to create complaints");

            // Set UserID from claims
            var userId = GetCurrentUserId();
            if (userId.HasValue)
            {
                complaint.UserID = userId.Value;
            }

            // Set CreatedBy from role name
            var roleName = await GetCurrentUserRoleNameAsync();
            if (!string.IsNullOrEmpty(roleName))
            {
                complaint.CreatedBy = roleName;
            }
        }
    }
}
