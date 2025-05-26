import jwt from 'jsonwebtoken';

// Substitua pelo seu segredo real — deve ser o mesmo usado no jwt.sign()
const segredoJWT = 'xH92!fJw@8d3R*eGvMzY#LqP!z5W$s^VpKwBnXtCePzUv7rN9kL2QjDmT8yHsAfEq';

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Exemplo: "Bearer token123"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, segredoJWT, (err, usuario) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Se ok, injeta os dados do token no req
    req.usuario = usuario;
    next();
  });
};

export default autenticarToken;
