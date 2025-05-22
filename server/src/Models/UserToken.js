class UserToken {
  constructor() {
    this.tokens = [];
  }

  save(userId, token) {
    this.tokens.push({ userId, token });
  }

  getByUserId(userId) {
    return this.tokens.find(entry => entry.userId === userId);
  }
}

export default new UserToken();
