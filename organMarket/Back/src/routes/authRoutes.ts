import { Router } from 'express';
import { registerProvider, registerClient } from '../controllers/authController';

const router = Router();

// Rutas de registro
router.post('/register/provider', registerProvider);
router.post('/register/client', registerClient);

export default router;
