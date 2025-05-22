export default class ConteudoAprendizado {
  constructor(titulo, descricao) {
    this.titulo = titulo;
    this.descricao = descricao;
  }

  getResumo() {
    return this.descricao.length > 100
      ? this.descricao.slice(0, 100) + '...'
      : this.descricao;
  }
}
