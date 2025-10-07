import User from "./Models/Users.js"; // sua classe User
import bcrypt from "bcryptjs";

async function seed() {
  const admin = User.findByEmail("Admin");
  if (admin) {
    console.log("Admin já existe.");
    return;
  }

  // IMPORTANTE: passar 'password' (texto) OU 'passwordHash'
  User.create({
    id:1,
    email: "Admin",
    password: "123456aabbcc",        // <- isso evita o erro
    name: "Kauai Staingel",
    age: 24,
    interests: "Rainbow Six e São Paulo Futebol Clube",
  });

  console.log("Admin criado.");
}

seed();