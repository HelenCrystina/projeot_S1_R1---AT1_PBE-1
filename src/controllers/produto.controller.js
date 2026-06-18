import produtoModel from '../models/produto.model.js';

const produtoController = {

    selecionaTodos: async (req, res) => {
        try {
            const resultado = await produtoModel.selectAll();
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A consulta não retornou resultados' });
            }
            return res.status(200).json({ data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
        }
    },
    criarProduto: async (req, res) => {
        try {
            const { idCategoria, nomeProduto, valorProduto } = req.body;
            const { filename } = req.file;

            if (
                !idCategoria || !nomeProduto || !valorProduto) {
                return res.status(400).json({ message: "Verifique os dados enviados e tente novamente" });
            }
            if (req.files) {
                return res.status(400).json({ message: "O arquivo não foi enviado" });
            }
            const produtosImagem = resultado.map(produto => ({
                ...produto,
                imagemUrl: `http://localhost:3000/uploads/${produto.imagem}`
            }));
            const resultado = await produtoModel.insertProdutos(
                idCategoria,
                nomeProduto,
                valorProduto,
                filename);


            res.status(201).json({ message: "Registro incluído com sucesso", data: resultado, imagens: produtosImagem });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
        }
    },
    alterarProduto: async (req, res) => {
        try {
            const idProduto = Number(req.params.idProduto);
            const { idCategoria, nomeProduto, valorProduto } = req.body;

            if (Number.isNaN(idProduto) || idProduto <= 0 || Number.isNaN(idCategoria) || idCategoria <= 0) {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const produtoAtual = await produtoModel.selectByIdProduto(idProduto);
            if (produtoAtual.length === 0) {
                return res.status(404).json({ message: 'Insira um ID válido' });
            }

            const novoIdCategoria = idCategoria ?? produtoAtual[0].idCategoria;
            const novaNomeProduto = nomeProduto ?? produtoAtual[0].nomeProduto;
            const novoValorProduto = valorProduto ?? produtoAtual[0].valorProduto;
            const resultUpdateProdutos = await produtoModel.updateProduto(novoIdCategoria, novaNomeProduto, novoValorProduto);
            if (resultUpdateProdutos.affectedRows === 1 && resultUpdateProdutos.changedRows === 0) {
                return res.status(200).json({ message: 'Nenhuma alteração foi realizada' });
            }

            return res.status(200).json({ message: 'Produto alterado com sucesso' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    excluirProduto: async (req, res) => {
        try {
            const idProduto = Number(req.params.idProduto);
            if (!idProduto) {
                return res.status(400).json({ message: "Forneça um ID" });
            }
            const produtoAtual = await produtoModel.selectByIdProduto(idProduto);
            if (produtoAtual.length === 0) {
                return res.status(200).json({ message: "Produto não localizado na base de dados" });
            }
            await produtoModel.deleteProduto(idProduto)
            const resultadoDelete = await produtoModel.deleteProduto(idProduto);

            res.status(200).json({ message: "Produto excluído com sucesso", data: resultadoDelete });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
        }
    }


};

export default produtoController;