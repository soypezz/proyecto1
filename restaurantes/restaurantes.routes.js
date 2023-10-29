import express from 'express';
import { createRestaurante, getRestauranteById, getRestaurantesByCategoriaNombre, updateRestauranteById, disableRestauranteById } from './restaurantes.controller';

const router = express.Router();

// Endpoint POST /restaurantes
router.post('/', createRestaurante);

// Endpoint GET /restaurantes/:id
router.get('/:id', getRestauranteById);

// Endpoint GET /restaurantes
router.get('/', getRestaurantesByCategoriaNombre);

// Endpoint PUT /restaurantes/:id
router.put('/:id', updateRestauranteById);

// Endpoint PUT /restaurantes/:id
router.put('/:id', disableRestauranteById);

export default router;
