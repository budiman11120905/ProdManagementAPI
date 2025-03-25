using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Models;
using ProductManagementAPI.Services;

namespace ProductManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly UserService _userService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AuthService authService, UserService userService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _userService = userService;
            _logger = logger;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("Request body is required");
            }
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.PasswordHash))
            {
                return BadRequest("Username and password are required");
            }

            var token = _authService.GenerateJwtToken(user);
            return Ok(new { token });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _userService.Register(user);

                return Ok(new
                {
                    message = "Registration successful",
                    userId = user.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    error = "Registration failed",
                    details = ex.Message
                });
            }
        }

        [HttpGet("test-auth")]
        [Authorize]
        public IActionResult TestAuth()
        {
            return Ok("You are authenticated!");
        }
    }
}
