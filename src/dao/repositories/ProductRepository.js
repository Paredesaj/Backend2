import fs from 'fs/promises';
import path from 'path';

const productsFile = path.resolve('data/productos.json');

class ProductRepository {
  async getAll() {
    try {
      const data = await fs.readFile(productsFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('🔴 Error leyendo productos.json:', error.message);
      throw new Error('No se pudo leer el archivo de productos');
    }
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find(product => product.id === id) || null;
  }

  async save(product) {
    const products = await this.getAll();
    products.push(product);
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
    return product;
  }

  async update(id, updatedProduct) {
    let products = await this.getAll();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedProduct };
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
    return products[index];
  }

  async delete(id) {
    let products = await this.getAll();
    const newProducts = products.filter(product => product.id !== id);
    if (products.length === newProducts.length) return false;

    await fs.writeFile(productsFile, JSON.stringify(newProducts, null, 2));
    return true;
  }
}

export default ProductRepository;
