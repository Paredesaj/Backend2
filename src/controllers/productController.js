import { Router } from 'express';
import ProductService from '../services/ProductService.js';
import Product from '../dao/models/Product.model.js'; // Importa el modelo del producto

const router = Router();
const productService = new ProductService();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('🔴 Error en GET /products:', error.message);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Ruta para obtener un producto por su ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto', error });
  }
});

// Exportar la creación de producto como un método dentro de un objeto
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto', error });
  }
};

export default { createProduct, router };
