import express from 'express';
import productController from '../controllers/productController.js'; // Asegúrate de que la ruta y el nombre sean correctos

const router = express.Router();

// Asegúrate de que el método createProduct esté correctamente exportado desde productController.js
router.post('/', productController.createProduct); // Aquí está el controlador

export default router;
