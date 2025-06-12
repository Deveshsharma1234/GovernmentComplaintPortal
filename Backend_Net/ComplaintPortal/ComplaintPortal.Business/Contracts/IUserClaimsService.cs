using ComplaintPortal.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Business.Contracts
{
    public interface IUserClaimsService
    {
        Task<string> GetCurrentUserRoleNameAsync();
        int? GetCurrentUserId();
        int GetCurrentUserIdRequired();
        int? GetCurrentUserRoleId();
        string GetCurrentUserEmail();
        bool IsCurrentUserAuthenticated();
        Task SetComplaintUserInfoAsync(complaint complaint);
    }
}
