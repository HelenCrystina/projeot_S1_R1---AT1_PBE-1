import 'dotenv/config';
import express from 'express';
import router from './routes/routes.js';
import { initializeDatabase } from './config/db.js';
const app = express();

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.json());
app.use('/', router);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
});

initializeDatabase().then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
    });
}).catch(err => {
    console.error("Erro ao inicializar o banco de dados:", err);
});