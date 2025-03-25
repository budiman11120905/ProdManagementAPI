using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ProductManagementAPI.Models;

namespace ProductManagementAPI.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public string GenerateJwtToken(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "User object cannot be null");
            }

            if (string.IsNullOrEmpty(user.Username))
            {
                throw new ArgumentException("Username is required", nameof(user.Username));
            }

            var jwtKey = _configuration["Jwt:Key"] ??
                throw new InvalidOperationException("JWT Key is missing in configuration");
            var jwtIssuer = _configuration["Jwt:Issuer"] ??
                throw new InvalidOperationException("JWT Issuer is missing in configuration");
            var jwtAudience = _configuration["Jwt:Audience"] ??
                throw new InvalidOperationException("JWT Audience is missing in configuration");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
            }.Where(c => c != null).ToArray();

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}