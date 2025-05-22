import express from 'express';
import AuthController from '../Controllers/AuthController.js';

const router = express.Router();

//Validar Login
router
.route('Rota')
.post((req,res)=>AuthController.login(req,res));

//Cadastro
router
.route('Rota')
.post((req,res)=>AuthController.register(req,res));