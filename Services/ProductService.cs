using ProductManagementAPI.Models;
using ProductManagementAPI.Repositories;

namespace ProductManagementAPI.Services
{
    public class ProductService
    {
        private readonly ProductRepository _productRepository;
        public ProductService(ProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _productRepository.GetAllProducts();
        }
        public async Task<Product> GetProductById(int id)
        {
            return await _productRepository.GetProductById(id);
        }
        public async Task AddProduct(Product product)
        {
            if (product == null)
                throw new ArgumentNullException(nameof(product));

            await _productRepository.AddProduct(product);
        }
        public async Task UpdateProduct(Product product)
        {
            await _productRepository.UpdateProduct(product);
        }
        public async Task DeleteProduct(int id)
        {
            await _productRepository.DeleteProduct(id);
        }

        public async Task<IEnumerable<Product>> SearchProducts(string name, decimal? minPrice, decimal? maxPrice)
        {
            return await _productRepository.SearchProducts(name, minPrice, maxPrice);
        }
    }
}
