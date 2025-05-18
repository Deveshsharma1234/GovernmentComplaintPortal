using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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

        // Generate token with additional claims
        public string GenerateToken(string username, string email, int id,int roleId)
        {
            var secretKey = _config["JwtSettings:SecretKey"];
            var issuer = _config["JwtSettings:Issuer"];
            var audience = _config["JwtSettings:Audience"];
            var expirationMinutes = int.Parse(_config["JwtSettings:ExpirationMinutes"]);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username), // Username claim
                new Claim(ClaimTypes.Email, email), // Email claim
                new Claim("UserId", id.ToString()), // Crewoperator Id claim
                new Claim("RoleId", roleId.ToString()),
                new Claim(ClaimTypes.Role, roleId==3? "Government Employee" : "Government Representative")
                
                // Add more claims if needed
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(expirationMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Validate JWT Token
        public ClaimsPrincipal ValidateJwtToken(string token)
        {
            var secretKey = _config["JwtSettings:SecretKey"];
            var issuer = _config["JwtSettings:Issuer"];
            var audience = _config["JwtSettings:Audience"];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = issuer,
                ValidAudience = audience,
                IssuerSigningKey = key
            };

            try
            {
                var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
                return principal;
            }
            catch
            {
                return null; // Invalid token
            }
        }
    }
}
