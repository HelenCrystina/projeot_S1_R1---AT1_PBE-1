import mysql from 'mysql2/promise'
import relative from 'path'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'transferenciaarquivo',
    port: '3306',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao MySQL');
        connection.release();
    } catch (error) {
        console.error(`Erro ao conectar com o MySQL: ${error}`);
    }
})();

export default pool;

