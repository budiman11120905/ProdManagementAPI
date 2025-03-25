using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Data;
using ProductManagementAPI.Models;

namespace ProductManagementAPI.Repositories
{
    public class ProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }
        public async Task<Product> GetProductById(int id)
        {
            return await _context.Products.FindAsync(id);
        }
        public async Task AddProduct(Product product)
        {
            if (product == null)
                throw new ArgumentNullException(nameof(product));

            product.Id = 0;
            product.CreatedAt = DateTime.UtcNow;

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateProduct(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Product>> SearchProducts(string name, decimal? minPrice, decimal? maxPrice)
        {
            var query = _context.Products.AsQueryable();
            if (!string.IsNullOrEmpty(name))
                query = query.Where(p => p.Name.Contains(name));
            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);
            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);
            return await query.ToListAsync();
        }
    }
}
