const jwt = require("jsonwebtoken");
const { secret } = require("../crypto/config");


const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado. Token requerido." });
  }

  try {
    const usuario = jwt.verify(token, secret); // Verifica el token con el secreto
    req.usuario = usuario;
    next(); // Continúa al siguiente middleware
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o expirado." });
  }
};

module.exports = verificarToken;
