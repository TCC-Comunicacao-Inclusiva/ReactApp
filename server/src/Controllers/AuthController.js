import AuthRegister from "../Services/AuthRegister.js";
import AuthLogin from "../Services/AuthLogin.js";
import Ambiente from "../Models/Ambiente.js";
import User from "../Models/Users.js";

class AuthController {
  async register(req, res) {
    const { email, password,name,age,interests } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
      const result = await AuthRegister.register(email, password,name,age,interests);
      res.status(200).json({ message: 'OK' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
      const result = await AuthLogin.login(email, password);
      res.json(result);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  async getPerfil(req, res) {
    try {
      const usuario = req.usuario;

      if (!usuario) {
        return res.status(400).json({ message: 'Usuário não encontrado no token' });
      }

      const usuarioCompleto = User.findByEmail(usuario.email);
      const { passwordHash, ...perfilSeguro } = usuarioCompleto;


      res.json({ perfil: perfilSeguro }); // ou { perfil: dadosCompletos } se buscar no banco
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar perfil' });
    }
  }

  async getAllAmbientes(req, res) {
  try {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(400).json({ message: 'Usuário não encontrado no token' });
    }

    const ambientes = Ambiente.getAll();


    res.json({ ambientes });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar ambientes' });
  }
}

  async createAmbientes(req, res) {
  try {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(400).json({ message: 'Usuário não encontrado no token' });
    }

    const ambientes = Ambiente.create(req.body);


    res.status(200).json({ message: 'Ok' });;
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar ambientes' });
  }
}

}




export default new AuthController();
