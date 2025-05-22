import Usuario from '../models/Usuario.js';

export function autenticarUsuario(email, senha) {
  const usuario = new Usuario(email, senha);
  if (!usuario.validarCredenciais()) {
    throw new Error("Email ou senha inválidos");
  }
  return Usuario.autenticar(usuario);
}
