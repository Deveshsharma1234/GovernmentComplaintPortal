using ComplaintPortal.DataAccess.Helper;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.EFCore;
using ComplaintPortal.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.DataAccess.Repository.Classes
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly AppDbContext _context;
        private readonly JwtSettings _jwtSettings;

        public RefreshTokenRepository(AppDbContext context,JwtSettings jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings;
        }

        public async Task<RefreshToken> FindRefreshToken(string refreshTokenString)
        {
           return await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshTokenString);
        }

        public async Task SaveRefreshToken(string refreshTokenString, user user)
        {
            var refreshTokenEntity = new RefreshToken
            {
                Token = refreshTokenString,
                UserId = user.UserId,
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutesRefresh),
                Created = DateTime.UtcNow
            };


            _context.RefreshTokens.Add(refreshTokenEntity);
            await _context.SaveChangesAsync();
        }
        public async Task SaveRefreshTokenEntity(RefreshToken newRefreshTokenEntity)
        {
            _context.RefreshTokens.Add(newRefreshTokenEntity);
            await _context.SaveChangesAsync();
        }

        public  void UpdateRefreshToken(RefreshToken storedRefreshToken)
        {
             _context.RefreshTokens.Update(storedRefreshToken);
        }

        public async Task RevokeAllRefreshToken(int userId)
        {
            // Revoke all active refresh tokens for the user (or just the one sent)
            var activeRefreshTokens = await _context.RefreshTokens
                .Where(rt => rt.UserId == userId && rt.Revoked == null && rt.Expires > DateTime.UtcNow)
                .ToListAsync();

            foreach (var token in activeRefreshTokens)
            {
                token.Revoked = DateTime.UtcNow;
            }
            await _context.SaveChangesAsync();
        }
    }
}
