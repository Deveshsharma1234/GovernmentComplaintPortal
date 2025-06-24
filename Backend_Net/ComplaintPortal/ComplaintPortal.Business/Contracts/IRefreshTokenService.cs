using ComplaintPortal.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.Business.Contracts
{
    public interface IRefreshTokenService
    {
        public Task SaveRefreshTokenService(string refreshTokenString, user User);
        public Task<RefreshToken> FindRefreshTokenService(string refreshTokenString);
        public void UpdateRefreshTokenService(RefreshToken refreshTokenString);
        public Task SaveRefreshTokenEntityService(RefreshToken newRefreshTokenEntity);
        public Task RevokeRefreshTokenService(int userId);
    }
}
