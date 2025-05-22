export default class ConteudoAprendizado {
  constructor(titulo, resumo, imagem = null) {
    this.titulo = titulo;
    this.resumo = resumo;
    this.imagem = imagem;
  }

  getResumo() {
    return this.resumo;
  }

  getTitulo() {
    return this.titulo;
  }

  getImagem() {
    return this.imagem;
  }
}

