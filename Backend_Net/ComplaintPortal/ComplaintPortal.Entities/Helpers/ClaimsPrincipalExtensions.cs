using System.Security.Claims;

namespace ComplaintPortal.Entities.Helpers
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetUserIdFromClaims(this ClaimsPrincipal user)
        {
            var userIdClaim = user?.FindFirst("UserId");

            if (userIdClaim == null)
                throw new UnauthorizedAccessException("UserId claim not found");

            return int.Parse(userIdClaim.Value);
        }


        public static int? GetUserIdFromClaimsOrNull(this ClaimsPrincipal user)
        {
            var userIdClaim = user?.FindFirst("UserId");
            return userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId)
                ? userId
                : null;
        }


        public static int GetRoleIdFromClaims(this ClaimsPrincipal user)
        {
            var roleIdClaim = user?.FindFirst("RoleId");
            if (roleIdClaim == null)
                throw new UnauthorizedAccessException("RoleId claim not found");
            return int.Parse(roleIdClaim.Value);
        }

        public static int? GetRoleIdFromClaimsOrNull(this ClaimsPrincipal user)
        {
            var roleIdClaim = user?.FindFirst("RoleId");
            return roleIdClaim != null && int.TryParse(roleIdClaim.Value, out int roleId)
                ? roleId
                : null;
        }

        public static string GetUserEmail(this ClaimsPrincipal user)
        {
            return user?.FindFirst(ClaimTypes.Email)?.Value
                   ?? throw new UnauthorizedAccessException("Email claim not found");
        }

        public static string GetUserEmailOrNull(this ClaimsPrincipal user)
        {
            return user?.FindFirst(ClaimTypes.Email)?.Value;
        }

        public static bool IsAuthenticated(this ClaimsPrincipal user)
        {
            return user?.Identity?.IsAuthenticated ?? false;
        }

    }
}
