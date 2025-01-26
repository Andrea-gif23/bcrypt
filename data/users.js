const bcrypt = require("bcrypt");


const usuarios = [
  {
    id: 1,
    usuario: "andrea",
    nombre: "Andrea Gutierrez",
    contraseña: bcrypt.hashSync("1234", 10),
  },
  {
    id: 2,
    usuario: "juan",
    nombre: "Juan Perez",
    contraseña: bcrypt.hashSync("5678", 10),
  },
];

module.exports = usuarios;
