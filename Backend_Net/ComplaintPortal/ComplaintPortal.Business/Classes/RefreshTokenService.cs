using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Helper;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.EFCore;
using ComplaintPortal.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace ComplaintPortal.Business.Classes
{
    public class RefreshTokenService(JwtSettings jwtSettings, 
        IRefreshTokenRepository refreshTokenRepository) : IRefreshTokenService
    {
        public  void UpdateRefreshTokenService(RefreshToken refreshTokenString)
        {
            //_context.RefreshTokens.Update(storedRefreshToken);
             refreshTokenRepository.UpdateRefreshToken(refreshTokenString);
        }

        public Task<RefreshToken> FindRefreshTokenService(string refreshTokenString)
        {
            return refreshTokenRepository.FindRefreshToken(refreshTokenString);
        }

        public async Task SaveRefreshTokenService(string refreshTokenString, user User)
        {
            await refreshTokenRepository.SaveRefreshToken(refreshTokenString, User);

        }

        public async Task SaveRefreshTokenEntityService(RefreshToken newRefreshTokenEntity)
        {
            await refreshTokenRepository.SaveRefreshTokenEntity(newRefreshTokenEntity);
        }

        public async Task RevokeRefreshTokenService(int userId)
        {
            // Revoke all active refresh tokens for the user (or just the one sent)
            await refreshTokenRepository.RevokeAllRefreshToken(userId);
        }
    }
}
