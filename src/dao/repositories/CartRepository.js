import fs from 'fs';
import path from 'path';

// Usar import.meta.url para obtener el directorio actual
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);  // Obtener el directorio

const cartsFile = path.join(__dirname, '../../data/carts.json');

class CartRepository {
  // Obtiene todos los carritos
  async getAll() {
    const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
    return carts;
  }

  // Obtiene un carrito por ID
  async getById(id) {
    const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
    return carts.find(cart => cart.id === id);
  }

  // Guarda un nuevo carrito
  async save(cart) {
    const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
    carts.push(cart);
    fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
    return cart;
  }

  // Actualiza un carrito
  async update(id, updatedCart) {
    const carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
    const index = carts.findIndex(cart => cart.id === id);
    if (index !== -1) {
      carts[index] = updatedCart;
      fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
      return updatedCart;
    }
    return null;
  }

  // Elimina un carrito
  async delete(id) {
    let carts = JSON.parse(fs.readFileSync(cartsFile, 'utf-8'));
    const index = carts.findIndex(cart => cart.id === id);
    if (index !== -1) {
      carts = carts.filter(cart => cart.id !== id);
      fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
      return true;
    }
    return false;
  }
}

export default CartRepository;  // Asegúrate de exportar correctamente
