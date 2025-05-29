import express from 'express';
import AuthController from '../Controllers/AuthController.js';
import autenticarToken from '../Middleware/Authtoken.js';

const router = express.Router();

//Validar Login
router
.route('/login')
.post((req,res)=>AuthController.login(req,res));

//Cadastro
router
.route('/register')
.post((req,res)=>AuthController.register(req,res));

//Perfil
router
.route('/perfil')
.get(autenticarToken,(req,res)=>AuthController.getPerfil(req,res));

//AllAmbientes
router
.route('/allambientes')
.get(autenticarToken,(req,res)=>AuthController.getAllAmbientes(req,res));


export default router;