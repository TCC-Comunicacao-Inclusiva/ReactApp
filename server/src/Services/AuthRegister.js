import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../Models/Users.js';
import UserToken from '../Models/UserToken.js';

class AuthRegister {
  generateRandomString(length = 16) {
    return crypto.randomBytes(length).toString('hex');
  }

  async register(email, password,name,age,interests) {
    if (User.findByEmail(email)) {
      throw new Error('Email já está em uso');
    }

    const randomStr = this.generateRandomString(3);
    const finalPassword = password + randomStr;
    const passwordHash = await bcrypt.hash(finalPassword, 8);

    const newUser = User.create({ email, passwordHash,name,age,interests });

    const userN = User.findByEmail(email);

    UserToken.save(Number(userN.id), randomStr);

    return {
      message: 'Usuário criado com sucesso',
      userId: newUser.id,
    };
  }
}

export default new AuthRegister();
