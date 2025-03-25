using ProductManagementAPI.Models;

namespace ProductManagementAPI.Services;

public interface IAuthService
{
    string GenerateJwtToken(User user);
}