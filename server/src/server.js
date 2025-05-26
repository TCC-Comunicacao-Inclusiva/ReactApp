import express from 'express';
import router from './Routes/routes.js';
import cors from 'cors';


const app = express();

// Middleware para permitir JSON no corpo das requisições
app.use(express.json()); 

app.use(cors());
app.use('/', router);

const PORT = 5000;
const HOST = '172.20.10.5'//'192.168.15.114';
app.listen(PORT,HOST)
  .on('listening', () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
  })
  .on('error', (err) => {
    console.error('Erro ao iniciar servidor:', err.message);
    process.exit(1);
  });
