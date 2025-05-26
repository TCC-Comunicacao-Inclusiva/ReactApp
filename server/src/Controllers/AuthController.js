import AuthRegister from "../Services/AuthRegister.js";
import AuthLogin from "../Services/AuthLogin.js";

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
      const result = await AuthRegister.register(email, password);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
      const result = await AuthLogin.login(email, password);
      res.json(result);
    } catch (err) {
      console.log(1)
      res.status(401).json({ message: err.message });
    }
  }

  async getPerfil(req, res) {
    try {
      const usuario = req.usuario;

      if (!usuario) {
        return res.status(400).json({ message: 'Usuário não encontrado no token' });
      }

      const usuarioCompleto = User.findByEmail(usuarioToken.email);
      const { passwordHash, ...perfilSeguro } = usuarioCompleto;


      res.json({ perfil: perfilSeguro }); // ou { perfil: dadosCompletos } se buscar no banco
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar perfil' });
    }
  }
}




export default new AuthController();
