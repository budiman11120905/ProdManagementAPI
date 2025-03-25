using System.ComponentModel.DataAnnotations;

namespace ProductManagementAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
