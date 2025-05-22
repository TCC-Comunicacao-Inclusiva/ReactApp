export default class Usuario {
  constructor(email, senha) {
    this.email = email;
    this.senha = senha;
  }

  validarCredenciais() {
    return this.email.length > 0 && this.senha.length > 0;
  }

  static autenticar(usuario) {
    // Simulação de autenticação
    return usuario.email === "admin@example.com" && usuario.senha === "123456";
  }

  getPrimeiroNome() {
  return this.email.split('@')[0];
}

}
