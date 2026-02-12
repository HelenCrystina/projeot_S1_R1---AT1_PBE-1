import express from 'express';
const categoriaRoutes = express.Router();
import categoriaController from '../controllers/categoria.controller.js';


categoriaRoutes.get('/categorias', categoriaController.selecionaTodos);
categoriaRoutes.post('/categorias', categoriaController.criarCategoria);
categoriaRoutes.put('/categorias/:idCategoria', categoriaController.alteraCategoria);
categoriaRoutes.delete('/categorias/:idCategoria', categoriaController.excluirCategoria);


export default categoriaRoutes;