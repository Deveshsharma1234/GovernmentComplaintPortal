using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography; // For generating random refresh tokens
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ComplaintPortal.DataAccess.Helper
{
    public class JwtConfig
    {
        private readonly IConfiguration _config;

        public JwtConfig(IConfiguration config)
        {
            _config = config;
        }

        // Configuration values from appsettings.json
        private string SecretKey => _config["JwtSettings:SecretKey"];
        private string Issuer => _config["JwtSettings:Issuer"];
        private string Audience => _config["JwtSettings:Audience"];
        private int ExpirationMinutes => int.Parse(_config["JwtSettings:ExpirationMinutes"] ?? "15"); // Default 15 if not found
        private int ExpirationMinutesRefresh => int.Parse(_config["JwtSettings:ExpirationMinutesRefresh"] ?? "4320"); // Default 3 days (4320 minutes)

        public JwtSettings GetJwtSettings()
        {
            return new JwtSettings
            {
                SecretKey = SecretKey,
                Issuer = Issuer,
                Audience = Audience,
                ExpirationMinutes = ExpirationMinutes,
                ExpirationMinutesRefresh = ExpirationMinutesRefresh
            };
        }

        // Generate token with additional claims
        public string GenerateAccessToken(string email, int id, int? roleId)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email),
                new Claim("UserId", id.ToString()),
                new Claim("RoleId", roleId.ToString()),
                new Claim(ClaimTypes.Role, roleId == 3 ? "Government Employee" : "Government Representative")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(ExpirationMinutes), // Use UtcNow
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Generate Refresh Token
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        // Method to get principal from an EXPIRED token (needed for refresh)
        public ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true, // You might want to validate audience here
                ValidateIssuer = true, // You might want to validate issuer here
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey)),
                ValidAudience = Audience,
                ValidIssuer = Issuer,
                ValidateLifetime = false // This is crucial: don't validate lifetime here
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token algorithm");
            }

            return principal;
        }
    }

    
}