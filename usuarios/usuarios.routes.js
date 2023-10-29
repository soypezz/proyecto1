import { createUser, getUser, login, updateUser, disableUserById} from "./usuarios.controller.js";
import {Router} from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getUser);

// Endpoint POST 
router.post('/', createUser );

// Endpoint POST /usuarios/login
router.post('/login', login);

// Endpoint PUT /usuarios/:id
router.put('/:id', updateUser);

// Endpoint PUT /usuarios/:id
router.put('/:id', disableUserById);

export default router;