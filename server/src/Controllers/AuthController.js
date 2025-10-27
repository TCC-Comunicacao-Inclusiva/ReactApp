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
      const { usuario } = req;

      if (!usuario || !usuario.id) {
        return res.status(400).json({ message: 'Usuário não encontrado no token' });
      }

      const ambientes = Ambiente.getAll(usuario.id);
      return res.status(200).json({ ambientes });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao buscar ambientes' });
    }
  }

  async createAmbientes(req, res) {
    try {
      const { usuario } = req;

      if (!usuario || !usuario.id) {
        return res.status(400).json({ message: 'Usuário não encontrado no token' });
      }

      // validação mínima (ajuste conforme sua regra)
      const { nome, cards } = req.body || {};
      if (!nome) {
        return res.status(400).json({ message: 'Campo "nome" é obrigatório' });
      }

      // NUNCA confie em userId do body: sempre derive do token
      const novoAmbiente = Ambiente.create(usuario.id, {
        nome,
        cards: Array.isArray(cards) ? cards : []
      });

      // Retorna o recurso criado
      return res.status(201).json({ ambiente: novoAmbiente });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao criar ambiente' });
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

async saveNewOrder(req, res) {
    try {
      const { usuario } = req;                // vindo do authMiddleware
      const { newAmbientesIds } = req.body;   // vindo do front

      if (!usuario?.id) {
        return res.status(401).json({ ok: false, error: 'Usuário não autenticado.' });
      }

      if (!Array.isArray(newAmbientesIds) || newAmbientesIds.length === 0) {
        return res.status(400).json({ ok: false, error: 'newAmbientesIds é obrigatório.' });
      }

      // chama o método da classe Ambiente
      const result = Ambiente.reassignIds(usuario.id, newAmbientesIds);

      if (!result.ok) {
        return res.status(400).json(result);
      }

      return res.status(200).json({
        ok: true,
        message: 'Nova ordem salva com sucesso.',
        ambientes: result.ambientes,
      });
    } catch (error) {
      console.error('Erro ao salvar nova ordem:', error);
      return res.status(500).json({ ok: false, error: 'Erro interno ao salvar ordem.' });
    }
  }

async saveCardsNewOrder(req, res) {
  try {
    const { usuario } = req;
    const { ambienteId, newCardsIds } = req.body;

    if (!usuario?.id)
      return res.status(401).json({ ok:false, error:'Usuário não autenticado.' });

    if (!ambienteId)
      return res.status(400).json({ ok:false, error:'ambienteId é obrigatório.' });

    if (!Array.isArray(newCardsIds) || !newCardsIds.length)
      return res.status(400).json({ ok:false, error:'newCardsIds é obrigatório.' });

    // normaliza itens: garante tipos e campos esperados pelo repo
    const normalized = newCardsIds.map((x, i) => ({
      id: Number.isFinite(Number(x?.id)) ? Number(x.id) : null,
      titulo: String(x?.titulo ?? '').trim() || `Card ${i + 1}`,
      newId: Number(x?.newId),
    })).filter(x => Number.isFinite(x.newId) && x.newId > 0);

    if (!normalized.length)
      return res.status(400).json({ ok:false, error:'newCardsIds inválido.' });

    const result = Ambiente.reassignCardIds(usuario.id, Number(ambienteId), normalized);
    if (!result.ok) return res.status(400).json(result);

    return res.status(200).json({ ok:true, ambiente: result.ambiente });
  } catch (e) {
    console.error('Erro saveCardsNewOrder:', e);
    return res.status(500).json({ ok:false, error:'Erro interno.' });
  }
}


}




export default new AuthController();
