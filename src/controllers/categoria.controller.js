import categoriaModel from '../models/categoria.model.js';

const categoriaController = {

  selecionaTodos: async (req, res) => {
    try {
      const resultado = await categoriaModel.selectAll();
      if (resultado.length === 0) {
        return res.status(200).json({ message: 'A consulta não retornou resultados' });
      }
      return res.status(200).json({ data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
  },
  criarCategoria: async (req, res) => {
    try {
      const { descricaoCategoria } = req.body;
      if (
        !descricaoCategoria) {
        return res.status(400).json({ message: "Verifique os dados enviados e tente novamente" });
      }
      const resultado = await categoriaModel.insertCategoria(descricaoCategoria);

      res.status(201).json({ message: "Registro incluído com sucesso", data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
  },
  alteraCategoria: async (req, res) => {
    try {
      const idCategoria = Number(req.params.idCategoria);
      const { descricaoCategoria } = req.body;
      if (Number.isNaN(idCategoria) || idCategoria <= 0) {
        return res.status(400).json({ message: 'ID da categoria inválido' });
      }

      const categoriaAtual = await categoriaModel.selectByIdCategoria(idCategoria);
      if (categoriaAtual.length === 0) {
        return res.status(404).json({ message: 'Insira um ID válido' });
      }

      const resultUpdateCategoria = await categoriaModel.updateCategoria(descricaoCategoria);
      if (resultUpdateCategoria.affectedRows === 1 && resultUpdateCategoria.changedRows === 0) {
        return res.status(200).json({ message: 'Nenhuma alteração foi realizada' });
      }

      return res.status(200).json({ message: 'Categoria alterado com sucesso' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
    }
  },
  excluirCategoria: async (req, res) => {
    try {
      const idCategoria = Number(req.params.idCategoria);
      if (!idCategoria) {
        return res.status(400).json({ message: "Forneça um ID" });
      }
      const categoriaAtual = await categoriaModel.selectByIdCategoria(idCategoria);
      if (categoriaAtual.length === 0) {
        return res.status(200).json({ message: "Categoria não localizado na base de dados" });
      }
      if (produtos.length > 0) {
        return res.status(400).json({ message: "Não foi possivel escluir" });

      }
      if (produtos.length > 0) {
        return res.status(400).json({ message: "Não foi possivel excluir essa categoria" })
      }
      await categoriaModel.deleteCategoria(idCategoria)
      const resultadoDelete = await categoriaModel.deleteCategoria(idCategoria);

      res.status(200).json({ message: "Categoria excluída com sucesso", data: resultadoDelete });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
  }
};

export default categoriaController;