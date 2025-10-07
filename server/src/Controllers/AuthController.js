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
  const DATA_DIR = path.resolve(process.cwd(), 'data'); // <raiz do projeto>/data
  const FILE_PATH = path.join(DATA_DIR, 'events.json'); // <raiz>/data/events.json

  try {
    const { data, dataISO, latitude, longitude, texto, ambiente } = req.body;
    const usuario = req.usuario; // vem do middleware

    const when = dataISO || data || new Date().toISOString();

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

    // 3.1) Aplica SEMPRE um jitter aleatório de 3 a 5 metros
    let lat = Number(latitude);
    let lon = Number(longitude);

    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      const meters = 10 + Math.random() * 4; // [3,5) metros
      const jitterDegLat = meters / 111320; // 1 m ≈ 1/111320 grau de latitude
      const angle = Math.random() * 3 * Math.PI;

      // desloca latitude
      lat += Math.cos(angle) * jitterDegLat;

      // desloca longitude corrigindo pela latitude (escala métrica)
      const latRad = (lat * Math.PI) / 180;
      const cosLat = Math.cos(latRad) || 1; // evita div/0
      lon += (Math.sin(angle) * jitterDegLat) / cosLat;
    }

    // 4) Adiciona e grava
    const newEvent = {
      data: when,
      latitude: lat,
      longitude: lon,
      texto,
      ambiente,
      usuario,
    };

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
