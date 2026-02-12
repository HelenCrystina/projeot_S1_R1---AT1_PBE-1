import pool from '../config/db.js'

const categoriaModel = {

  selectAll: async () => {
    const sql = 'SELECT * FROM categorias;';
    const [rows] = await pool.query(sql);
    return rows;
  },
  selectByIdCategoria: async (pIdCategoria) => {
    const sql = "SELECT * FROM categorias WHERE idCategoria = ?;";
    const values = [pIdCategoria];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  insertCategoria: async (pDescricaoCategoria) => {
    const sql = "INSERT INTO categorias(descricaoCategoria) VALUES (?);";
    const values = [pDescricaoCategoria];
    const [rows] = await pool.query(sql, values);
    return { rows };
  },
  updateCategoria: async (pIdCategoria, pDescricaoCategoria) => {
    const sql = 'UPDATE categorias SET descricaoCategoria=? WHERE idCategoria=?;';
    const values = [pIdCategoria, pDescricaoCategoria];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  deleteCategoria: async (pIdCategoria) => {
    const sql = "DELETE FROM categorias WHERE idCategoria = ? ;";
    const values = [pIdCategoria];
    const [rows] = await pool.query(sql, values);
    return rows;
  },


}

export default categoriaModel;