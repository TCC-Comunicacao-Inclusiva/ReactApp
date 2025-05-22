import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/Users.js';
import UserToken from '../models/UserToken.js';

class AuthLogin {
  async login(email, password) {
    const user = User.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const tokenData = UserToken.getByUserId(user.id);
    if (!tokenData) {
      throw new Error('Token de senha não encontrado');
    }

    const passwordWithToken = password + tokenData.token;
    const isPasswordValid = await bcrypt.compare(passwordWithToken, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      'seu_segredo_secreto',
      { expiresIn: '1h' }
    );

    return { token };
  }
}

export default new AuthLogin();
