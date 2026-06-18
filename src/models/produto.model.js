import { connection as pool } from '../config/db.js';

const produtoModel = {

  selectAll: async () => {
    const sql = 'SELECT * FROM produtos;';
    const [rows] = await pool.query(sql);
    return rows;
  },
  insertProdutos: async (pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem) => {
    const sql =
      "INSERT INTO produtos (idCategoria, nomeProduto, valorProduto, vinculoImagem) VALUES (?, ?, ?, ?);";
    const values = [pIdCategoria, pNomeProduto, pValorProduto, pVinculoImagem];
    const [rows] = await pool.query(sql, values);
    return { rows };
  },
  selectByIdProduto: async (pIdProduto) => {
    const sql = "SELECT * FROM produtos WHERE idProduto = ?;";
    const values = [pIdProduto];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  updateProduto: async (pIdCategoria, pNomeProduto, pValorProduto, pIdProduto) => {
    const sql = 'UPDATE produtos SET idCategoria=?, nomeProduto=?, valorProduto=? WHERE idProduto=?;';
    const values = [ pIdCategoria, pNomeProduto, pValorProduto, pIdProduto];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  deleteProduto: async (pIdProduto) => {
    const sql = "DELETE FROM produtos WHERE idProduto = ? ;";
    const values = [pIdProduto];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
}

export default produtoModel;