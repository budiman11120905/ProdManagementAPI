using ProductManagementAPI.Models;
using ProductManagementAPI.Repositories;

namespace ProductManagementAPI.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task Register(User user)
        {
            if (string.IsNullOrEmpty(user.PasswordHash))
                throw new ArgumentException("Password hash is required");

            await _userRepository.AddUser(user);
        }
    }
}