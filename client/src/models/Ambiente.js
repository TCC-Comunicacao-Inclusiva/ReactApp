export default class Ambiente {
  constructor(nome, iconePath) {
    this.nome = nome;
    this.iconePath = iconePath;
  }

  getIcone() {
    return this.iconePath;
  }

  getNomeFormatado() {
    return this.nome.charAt(0).toUpperCase() + this.nome.slice(1);
  }
}
