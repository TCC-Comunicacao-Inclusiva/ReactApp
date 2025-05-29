import dotenv from 'dotenv';
import express from 'express';
import router from './Routes/routes.js';
import cors from 'cors';
dotenv.config({path:'C:\\Users\\Kauai\\Desktop\\Estudos\\TCC\\ReactApp\\server\\constants\\.env'});

const app = express();

// Middleware para permitir JSON no corpo das requisições
app.use(express.json()); 

app.use(cors());
app.use('/', router);

const PORT = 5000;
const HOST = process.env.host;
app.listen(PORT,HOST)
  .on('listening', () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
  })
  .on('error', (err) => {
    console.error('Erro ao iniciar servidor:', err.message);
    process.exit(1);
  });
