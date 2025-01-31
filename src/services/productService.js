import ProductRepository from '../dao/repositories/ProductRepository.js';
import ProductDTO from '../dao/dto/ProductDTO.js';

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    const products = await this.productRepository.getAll();
    return products.map(product => new ProductDTO(product));
  }

  async getProductById(id) {
    const product = await this.productRepository.getById(id);
    return product ? new ProductDTO(product) : null;
  }

  async addProduct(product) {
    return await this.productRepository.save(product);
  }

  async updateProduct(id, product) {
    return await this.productRepository.update(id, product);
  }

  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }
}

export default ProductService;
