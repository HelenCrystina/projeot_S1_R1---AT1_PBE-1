import express from 'express';
const router = express.Router();
import categoriaRoutes from './categoria.routes.js';
import produtoRoutes from './produto.routes.js';

router.use('/', categoriaRoutes);
router.use('/', produtoRoutes);


export default router;