import express from 'express';
import { createCart, getCartById, addProductToCart } from '../controllers/cartController.js';

const router = express.Router();

// Ruta para crear un carrito
router.post('/', createCart);

// Ruta para obtener un carrito por ID
router.get('/:id', getCartById);

// Ruta para agregar productos a un carrito
router.post('/:id/products', addProductToCart);

export default router;
