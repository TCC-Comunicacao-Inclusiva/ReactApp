export default class Ambiente {
  constructor(titulo, resumo, icon = null) {
    this.titulo = titulo;
    this.resumo = resumo;
    this.icon = icon;
  }

  getResumo() {
    return this.resumo;
  }

  getTitulo() {
    return this.titulo;
  }

  getImagem() {
    return this.icon;
  }
}

