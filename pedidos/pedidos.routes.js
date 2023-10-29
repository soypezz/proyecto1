import express from 'express';
import {createPedido, getPedidoById, getPedidoByUsuario, getPedidosEnviados, updatePedidoById, disablePedidoById} from './pedidos.controller';

const router = express.Router();

// Endpoint POST /pedido
router.post('/', createPedido);

// Endpoint GET /pedido/:id
router.get('/', getPedidoById);

// Endpoint GET /pedido/:id
router.get('/', getPedidoByUsuario);

// Endpoint GET /pedido
router.get('/', getPedidosEnviados);

// Endpoint UPDATE /pedido/:id
router.update('/', updatePedidoById);

// Endpoint PUT /pedido/:id
router.put('/', disablePedidoById);

