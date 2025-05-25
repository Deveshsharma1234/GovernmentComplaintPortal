using System.Security.Claims;

namespace ComplaintPortal.Helpers
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

    }
}
