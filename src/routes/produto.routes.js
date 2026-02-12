import express from 'express';
const produtoRoutes = express.Router();
import produtoController from '../controllers/produto.controller.js';
import uploadImage from '../middlewares/uploadImage.middleware.js';

produtoRoutes.get('/produtos', produtoController.selecionaTodos);
produtoRoutes.post('/produtos', uploadImage, produtoController.criarProduto);
produtoRoutes.put('/produtos/:idProduto', produtoController.alterarProduto);
produtoRoutes.delete('/produtos/:idProduto', produtoController.excluirProduto);


export default produtoRoutes;