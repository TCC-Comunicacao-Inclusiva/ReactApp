import express from 'express';
import AuthController from '../Controllers/AuthController.js';

const router = express.Router();

//Validar Login
router
.route('/login')
.post((req,res)=>AuthController.login(req,res));

//Cadastro
router
.route('/register')
.post((req,res)=>AuthController.register(req,res));


export default router;