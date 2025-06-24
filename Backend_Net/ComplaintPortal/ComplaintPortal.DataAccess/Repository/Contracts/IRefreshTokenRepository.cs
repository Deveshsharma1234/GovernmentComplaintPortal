using ComplaintPortal.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
    public interface IRefreshTokenRepository
    {
        public Task SaveRefreshToken(string refreshTokenString, Entities.Models.user user);
        public Task SaveRefreshTokenEntity(RefreshToken newRefreshTokenEntity);
        public Task<RefreshToken> FindRefreshToken(string refreshTokenString);
        public void UpdateRefreshToken(RefreshToken refreshTokenString);
        public Task RevokeAllRefreshToken(int userId);
    }
}
