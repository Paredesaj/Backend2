import Cart from '../dao/models/Cart.js';
  // Asegúrate de que la ruta sea correcta

// Crear un nuevo carrito
export const createCart = async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });  // Inicializa el carrito vacío
    await newCart.save();
    res.status(201).json({ message: 'Carrito creado con éxito', cart: newCart });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
  }
};

// Obtener un carrito por ID
export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('products');  // Usando populate para obtener los productos
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
};

// Agregar un producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Supongamos que el producto se pasa en el cuerpo de la solicitud
    const product = req.body.product; // Asegúrate de que el producto esté en el cuerpo
    cart.products.push(product);
    await cart.save();

    res.status(200).json({ message: 'Producto agregado al carrito', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto al carrito', error: error.message });
  }
};
