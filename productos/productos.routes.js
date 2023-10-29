import express from 'express';
import { createProducto, getProductoById, getProductosByRestauranteCategoria, updateProductoById, disableProductoById } from './productos.controller';

const router = express.Router();

// Endpoint POST /productos
router.post('/', createProducto);

// Endpoint GET /productos/:id
router.get('/:id', getProductoById);

// Endpoint GET /productos
router.get('/', getProductosByRestauranteCategoria)

// Endpoint PUT /productos/:id
router.put('/:id', updateProductoById);

// Endpoint PUT /productos/:id
router.put('/:id', disableProductoById);

export default router;
