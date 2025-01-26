const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secret } = require("../crypto/config");
const usuarios = require("../data/users");

const router = express.Router();

// Login: Autenticar usuario y generar token JWT
router.post("/login", (req, res) => {
  const { usuario, contraseña } = req.body;
  const user = usuarios.find((u) => u.usuario === usuario);

  if (!user || !bcrypt.compareSync(contraseña, user.contraseña)) {
    return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos." });
  }

  const token = jwt.sign({ id: user.id, nombre: user.nombre }, secret, { expiresIn: "1h" });
  res.json({ mensaje: "Inicio de sesión exitoso.", token });
});

// Logout: Destruir la sesión
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ mensaje: "Sesión cerrada." });
  });
});

// Dashboard: Panel protegido por JWT
router.get("/dashboard", (req, res) => {
  res.json({ mensaje: `Bienvenido al panel, ${req.usuario.nombre}` });
});

module.exports = router;
