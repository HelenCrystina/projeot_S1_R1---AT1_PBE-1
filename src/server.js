import express from 'express';
const app = express();
const PORT = 8000;
import router from './routes/routes.js';

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}`);
})