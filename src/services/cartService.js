import ProductRepository from '../dao/repositories/ProductRepository.js'; // Asegúrate de usar la extensión .js
import CartRepository from '../dao/repositories/CartRepository.js'; // Asegúrate de usar la extensión .js

class CartServices {
  // Procesa la compra del carrito
  async processPurchase(cartId) {
    const cart = await CartRepository.getById(cartId);
    let failedProducts = [];

    // Verifica el stock de los productos en el carrito
    for (const item of cart.items) {
      const product = await ProductRepository.getById(item.productId);
      if (product.stock >= item.quantity) {
        // Si hay stock, actualiza el stock del producto
        await ProductRepository.update(item.productId, {
          stock: product.stock - item.quantity,
        });
      } else {
        // Si no hay suficiente stock, agrega el producto a la lista de fallos
        failedProducts.push(item);
      }
    }

    return failedProducts; // Devuelve los productos que no se pudieron procesar
  }
}

export default CartServices; // Asegúrate de exportar correctamente
