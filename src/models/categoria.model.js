import { connection as pool } from '../config/db.js';

const categoriaModel = {

  selectAll: async () => {
    const sql = 'SELECT * FROM categorias;';
    const [rows] = await pool.query(sql);
    return rows;
  },

  selectByIdCategoria: async (id) => {
    const sql = 'SELECT * FROM categorias WHERE id = ?;';
    const [rows] = await pool.query(sql, [id]);
    return rows;
  },

  insertCategoria: async (nome, descricao) => {
    const sql = 'INSERT INTO categorias (nome, descricao) VALUES (?, ?);';
    const [result] = await pool.query(sql, [nome, descricao]);
    return result;
  },

  updateCategoria: async (id, nome, descricao) => {
    const sql = `
      UPDATE categorias
      SET nome = ?, descricao = ?
      WHERE id = ?;
    `;
    const [result] = await pool.query(sql, [nome, descricao, id]);
    return result;
  },

  deleteCategoria: async (id) => {
    const sql = 'DELETE FROM categorias WHERE id = ?;';
    const [result] = await pool.query(sql, [id]);
    return result;
  }

};

export default categoriaModel;