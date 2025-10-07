import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

class User {
  constructor() {
    this.filePath = path.join(
      "C:",
      "Users",
      "Kauai",
      "Desktop",
      "Estudos",
      "TCC",
      "ReactApp",
      "server",
      "data",
      "kids.json"
    );

    this._ensureFile();
  }


  _ensureFile() {
    if (!fs.existsSync(this.filePath)) {
      const initial = [
        {
          id: 1,
          email: "Admin",
          passwordHash: bcrypt.hashSync("123456aabbcc", 8),
          name: "Kauai Staingel",
          age: 24,
          interests: "Rainbow Six e São Paulo Futebol Clube",
        },
      ];
      fs.writeFileSync(this.filePath, JSON.stringify(initial, null, 2));
      return;
    }
    const raw = fs.readFileSync(this.filePath, "utf-8");
    try {
      JSON.parse(raw);
    } catch {
      // se o JSON estiver vazio ou corrompido, reseta para []
      fs.writeFileSync(this.filePath, "[]");
    }
  }


  _readUsers() {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      if (!data || !data.trim()) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }


  _writeUsers(users) {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  }


  findByEmail(email) {
    const users = this._readUsers();
    return users.find((u) => u.email === email);
  }


  create(userData) {
  const users = this._readUsers();


  if (!userData?.email) {
    throw new Error("create(userData): 'email' é obrigatório.");
  }
  if (users.some(u => u.email === userData.email)) {
    throw new Error(`Usuário com email '${userData.email}' já existe.`);
  }

  let passwordHash = userData.passwordHash;
  if (!passwordHash) {
    const pwd = userData.password;
    if (typeof pwd !== "string" || pwd.length === 0) {
      throw new Error("create(userData): informe 'password' (texto) ou 'passwordHash'.");
    }
    passwordHash = bcrypt.hashSync(pwd, 8);
  }

  const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  const user = {
    id: nextId,
    email: userData.email,
    passwordHash,             // sempre salva só o hash
    name: userData.name ?? "",
    age: userData.age ?? null,
    interests: userData.interests ?? "",
  };


  users.push(user);
  this._writeUsers(users);
  return user;
}


  async validatePassword(user, password) {
    return await bcrypt.compare(password, user.passwordHash);
  }
}

export default new User();
