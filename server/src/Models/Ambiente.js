// src/Repos/Ambiente.js (ou onde estiver seu repo)
class Ambiente {
  constructor() {
    this.ambientes = [
      {
        id: 1,
        userId: 1,
        nome: 'Aprendizado',
        cards: [
          { titulo: 'Aula de Artes', resumo: '', icon: 'Artes.png', audio:'artes' },
          { titulo: 'Aula de Biologia', resumo: '', icon: 'Biologia.jpeg', audio: 'biologia' },
          { titulo: 'Aluno', resumo: '', icon: 'Aluno.jpeg', audio: 'aluno' },
          { titulo: 'Brincar com Amigos', resumo: '', icon: 'BrincarComAmigos.jpeg', audio: 'BrincarComAmigos' },
          { titulo: 'Caderno', resumo: '', icon: 'Caderno.png', audio: 'caderno' },
          { titulo: 'Caneta', resumo: '', icon: 'Caneta.jpeg', audio:'caneta' }, 
          { titulo: 'Escola', resumo: '', icon: 'Escola.jpeg', audio: 'escola' },
          { titulo: 'Computador', resumo: '', icon: 'Computador.png', audio: 'computador' },
          { titulo: 'Lápis', resumo: '', icon: 'Lapis.png', audio: 'lapis' },
          { titulo: 'Borracha', resumo: '', icon: 'Borracha.png', audio: 'borracha' },
          { titulo: 'Mochila', resumo: '', icon: 'Mochila.png', audio: 'mochila' },
          { titulo: 'Professor', resumo: '', icon: 'Professor.png', audio: 'professor' },
          { titulo: 'Biblioteca', resumo: '', icon: 'Biblioteca.png', audio: 'biblioteca' },
          { titulo: 'Quadro', resumo: '', icon: 'Quadro.png', audio: 'quadro' },
          { titulo: 'Lousa', resumo: '', icon: 'Lousa.png', audio: 'lousa' },
          { titulo: 'Livros', resumo: '', icon: 'Livros.png', audio: 'livros' },
          { titulo: 'Recreio', resumo: '', icon: 'Recreio.png', audio: 'recreio' },
          { titulo: 'Merenda', resumo: '', icon: 'Merenda.png', audio: 'merenda' }
        ]
      },
      {
        id: 2,
        userId: 1,
        nome: 'Comidas',
        cards: [
          { titulo: 'Banana', resumo: '', icon: 'Banana.png', audio: 'banana' },
          { titulo: 'Maçã', resumo: '', icon: 'Maca.png', audio: 'maca' },
          { titulo: 'Melancia', resumo: '', icon: 'Melancia.png', audio: 'melancia' },
          { titulo: 'Arroz', resumo: '', icon: 'Arroz.jpeg', audio: 'arroz' },
          { titulo: 'Feijão', resumo: '', icon: 'Feijao.jpeg', audio: 'feijao' },
          { titulo: 'Carne', resumo: '', icon: 'Carne.png', audio: 'carne' },
          { titulo: 'Chocolate', resumo: '', icon: 'Chocolate.png', audio: 'chocolate' }
        ]
      }
    ];

    this._normalizeAll();
  }

  // =================== helpers ===================

  _toNumber(v) { return Number.parseInt(v, 10); }

  _clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  _sortByIdAsc(arr) {
    return arr.slice().sort((a, b) => (this._toNumber(a.id) - this._toNumber(b.id)));
  }

  _ensureCardIds(amb) {
    if (!Array.isArray(amb.cards)) amb.cards = [];
    let next = 1;
    for (const c of amb.cards) {
      if (c.id == null || !Number.isFinite(Number(c.id))) {
        c.id = next++;
      } else {
        next = Math.max(next, this._toNumber(c.id) + 1);
      }
    }
    amb.cards = this._sortByIdAsc(amb.cards);
    return amb;
  }

  _normalizeAll() {
    this.ambientes = this._sortByIdAsc(
      this.ambientes.map(a => this._ensureCardIds(a))
    );
  }

  _nextIdForUser(userId) {
    userId = this._toNumber(userId);
    const ids = this.ambientes
      .filter(a => a.userId === userId)
      .map(a => this._toNumber(a.id));
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  _nextCardId(amb) {
    if (!amb || !Array.isArray(amb.cards) || amb.cards.length === 0) return 1;
    return Math.max(...amb.cards.map(c => this._toNumber(c.id ?? 0))) + 1;
  }

  // =================== API pública ===================

getAll(userId) {
  userId = this._toNumber(userId);

  const list = this.ambientes
    .filter(a => a.userId === userId)
    .map(a => {
      // clona e garante que os cards tenham ids consistentes
      const copy = this._clone(a);
      this._ensureCardIds(copy); // <-- garante ids e ordena internamente
      // retorna o ambiente já com os cards em ordem
      return {
        ...copy,
        cards: this._sortByIdAsc(copy.cards || []),
      };
    });

  // retorna os ambientes em ordem de id
  return this._sortByIdAsc(list);
}


  getById(userId, id) {
    userId = this._toNumber(userId);
    id = this._toNumber(id);

    const amb = this.ambientes.find(amb => amb.userId === userId && this._toNumber(amb.id) === id);
    if (!amb) return null;

    const copy = this._clone(amb);
    copy.cards = this._sortByIdAsc(copy.cards || []);
    return copy;
  }

  create(userId, ambienteData) {
    userId = this._toNumber(userId);

    const novoAmbiente = {
      id: this._nextIdForUser(userId),
      userId,
      nome: ambienteData?.nome ?? '',
      cards: Array.isArray(ambienteData?.cards) ? this._clone(ambienteData.cards) : []
    };

    this._ensureCardIds(novoAmbiente);
    this.ambientes.push(novoAmbiente);
    this._normalizeAll();

    return this.getById(userId, novoAmbiente.id);
  }

  delete(userId, id) {
    userId = this._toNumber(userId);
    id = this._toNumber(id);
    const before = this.ambientes.length;

    this.ambientes = this.ambientes.filter(a => !(a.userId === userId && this._toNumber(a.id) === id));
    return this.ambientes.length !== before;
  }

  update(userId, id, patch) {
    userId = this._toNumber(userId);
    id = this._toNumber(id);

    const amb = this.ambientes.find(a => a.userId === userId && this._toNumber(a.id) === id);
    if (!amb) return null;

    Object.assign(amb, patch);
    this._ensureCardIds(amb);
    this._normalizeAll();

    return this.getById(userId, id);
  }

  // Reordena ids de AMBIENTES por nome -> newId
  reassignIds(userId, newAmbientesIds = []) {
    userId = this._toNumber(userId);

    if (!Array.isArray(newAmbientesIds) || newAmbientesIds.length === 0) {
      return { ok: false, error: 'Payload inválido: lista vazia.' };
    }

    const userAmbs = this.ambientes.filter(a => a.userId === userId);
    if (userAmbs.length === 0) {
      return { ok: false, error: 'Usuário não possui ambientes.' };
    }

    for (const item of newAmbientesIds) {
      const nome = String(item?.nome ?? '').trim();
      const newId = this._toNumber(item?.newId);
      const amb = userAmbs.find(a => a.nome === nome);
      if (amb && Number.isFinite(newId)) {
        amb.id = newId;
      }
    }

    this._normalizeAll();
    return { ok: true, ambientes: this.getAll(userId) };
  }

  // Reordena ids de CARDS dentro de um ambiente
  // newCardsIds: [{ id?: number, titulo?: string, newId: number }, ...]
  reassignCardIds(userId, ambienteId, newCardsIds = []) {
    userId = this._toNumber(userId);
    ambienteId = this._toNumber(ambienteId);

    if (!Array.isArray(newCardsIds) || newCardsIds.length === 0) {
      return { ok: false, error: 'Payload inválido: newCardsIds vazio.' };
    }

    const ambiente = this.ambientes.find(a => a.userId === userId && this._toNumber(a.id) === ambienteId);
    if (!ambiente) {
      return { ok: false, error: 'Ambiente não encontrado para este usuário.' };
    }

    // valida duplicidade de newId
    const newIds = newCardsIds.map(x => this._toNumber(x?.newId)).filter(Number.isFinite);
    const hasDupNewId = newIds.length !== new Set(newIds).size;
    if (hasDupNewId) {
      return { ok: false, error: 'Há IDs novos (newId) repetidos.' };
    }

    // cria mapas auxiliares
    const byId = new Map(ambiente.cards.map(c => [this._toNumber(c.id), c]));
    const byTitulo = new Map(ambiente.cards.map(c => [String(c.titulo).trim(), c]));

    // aplica remapeamento
    for (const item of newCardsIds) {
      const newId = this._toNumber(item?.newId);
      if (!Number.isFinite(newId) || newId <= 0) continue;

      let card = null;

      // prioridade: id, fallback: titulo
      if (item?.id != null && Number.isFinite(Number(item.id))) {
        card = byId.get(this._toNumber(item.id)) || null;
      }
      if (!card && item?.titulo) {
        card = byTitulo.get(String(item.titulo).trim()) || null;
      }
      if (card) {
        card.id = newId;
      }
    }

    // normaliza: ordena e garante consistência
    this._ensureCardIds(ambiente);

    return { ok: true, ambiente: this.getById(userId, ambienteId) };
  }

  // (opcional) adicionar card a um ambiente
  addCard(userId, ambienteId, card) {
    const amb = this.ambientes.find(a => a.userId === this._toNumber(userId) && this._toNumber(a.id) === this._toNumber(ambienteId));
    if (!amb) return null;
    const newCard = { ...card };
    newCard.id = this._nextCardId(amb);
    amb.cards.push(newCard);
    this._ensureCardIds(amb);
    return this.getById(userId, ambienteId);
  }
}

export default new Ambiente();
