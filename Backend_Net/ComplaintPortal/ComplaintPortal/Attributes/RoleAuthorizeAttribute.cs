using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ComplaintPortal.Attributes
{
    public class RoleAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
    {

        private readonly int[] _allowedRoles;

        public RoleAuthorizeAttribute(params int[] allowedRoles)
        {
            _allowedRoles = allowedRoles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            if (!user.Identity?.IsAuthenticated ?? false)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var roleIdClaim = user.Claims.FirstOrDefault(c => c.Type == "RoleId");

            if (roleIdClaim == null || !_allowedRoles.Contains(int.Parse(roleIdClaim.Value)))
            {
                context.Result = new ForbidResult();
            }
        }

    }
}
