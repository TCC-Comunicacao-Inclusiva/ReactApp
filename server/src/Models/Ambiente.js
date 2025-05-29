// src/Models/Ambiente.js

class Ambiente {
  constructor() {
    this.ambientes = [
      {
        id: 1,
        nome: 'Aprendizado',
        cards: [
          { titulo: 'Ir Embora', resumo: '', icon: 'exit.png' },
          { titulo: 'Comer', resumo: '', icon: 'fome.png' },
          { titulo: 'Quero ir ao Banheiro', resumo: '', icon: 'banheiro.png' },
          { titulo: 'Gostei', resumo: '', icon: 'like.png' },
          { titulo: 'Não Gostei', resumo: '', icon: 'dislike.png' },
          { titulo: 'Brincar', resumo: '', icon: 'brincar.png' }
        ]
      },
      {
        id: 2,
        nome: 'Banheiro',
        cards: [
          { titulo: 'Banheiro', resumo: '', icon: 'banheiro.png' },
          { titulo: 'Like', resumo: '', icon: 'like.png' },
          { titulo: 'Brincar', resumo: '', icon: 'brincar.png' },
          { titulo: 'Fome', resumo: '', icon: 'fome.png' },
          { titulo: 'Exit', resumo: '', icon: 'exit.png' }
        ]
      }
    ];
    this.nextId = 3;
  }

  getAll() {
    return this.ambientes;
  }

  getById(id) {
    return this.ambientes.find(amb => amb.id === Number(id));
  }

  create(ambienteData) {
    const novoAmbiente = { id: this.nextId++, ...ambienteData };
    this.ambientes.push(novoAmbiente);
    return novoAmbiente;
  }
}

export default new Ambiente();
