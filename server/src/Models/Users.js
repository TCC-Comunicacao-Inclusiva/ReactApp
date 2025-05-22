import bcrypt from 'bcryptjs';

class User {
  constructor() {
    this.users = [
      {
        id: 1,
        email: 'Admin',
        passwordHash: bcrypt.hashSync('123456aabbcc', 8)
      }
    ];
  }

  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  create(userData) {
    const user = { id: this.nextId++, ...userData };
    this.users.push(user);
    return user;
  }

  async validatePassword(user, password) {
    return await bcrypt.compare(password, user.passwordHash);
  }
}

export default new User();
