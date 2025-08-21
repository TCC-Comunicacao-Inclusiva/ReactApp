import AuthRegister from "../Services/AuthRegister.js";
import AuthLogin from "../Services/AuthLogin.js";
import Ambiente from "../Models/Ambiente.js";
import User from "../Models/Users.js";
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

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


async saveEvent(req, res) {

const DATA_DIR = path.resolve(process.cwd(), 'data');      // <raiz do projeto>/data
const FILE_PATH = path.join(DATA_DIR, 'events.json');      // <raiz>/data/events.json


    try {
      const { data, dataISO, latitude, longitude, texto } = req.body;
      const usuario = req.usuario; // vem do middleware

      const when = dataISO || data || new Date().toISOString();

      const newEvent = {
        data: when,
        latitude,
        longitude,
        texto,
        usuario,
      };

      // 1) Garante a pasta
      await fsp.mkdir(DATA_DIR, { recursive: true });

      // 2) Se o arquivo não existir, cria com array vazio
      try {
        await fsp.access(FILE_PATH, fs.constants.F_OK);
      } catch {
        await fsp.writeFile(FILE_PATH, '[]', 'utf8');
      }

      // 3) Lê o arquivo (tratando corrupção)
      const raw = await fsp.readFile(FILE_PATH, 'utf8');
      let events;
      try {
        events = JSON.parse(raw);
        if (!Array.isArray(events)) events = [];
      } catch {
        events = [];
      }

      // 4) Adiciona e grava
      events.push(newEvent);
      await fsp.writeFile(FILE_PATH, JSON.stringify(events, null, 2), 'utf8');

      return res
        .status(201)
        .json({ message: 'Evento salvo com sucesso!', event: newEvent, file: FILE_PATH });
    } catch (err) {
      console.error('[saveEvent] erro:', err);
      return res.status(500).json({ message: 'Erro ao salvar evento' });
    }
  }

}




export default new AuthController();
