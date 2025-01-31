import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

router.post('/', productController.createProduct); // Aquí está el controlador

export default router;
