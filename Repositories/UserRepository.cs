using ProductManagementAPI.Data;
using ProductManagementAPI.Models;

namespace ProductManagementAPI.Repositories
{
    public class UserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddUser(User user)
        {
            user.Id = 0;
            user.CreatedAt = DateTime.UtcNow;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync(); 
        }
    }
}