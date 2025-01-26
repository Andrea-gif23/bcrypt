const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const rutasUsuarios = require("./routes/users");
const verificarToken = require("./middlewares/authMiddleware");

const app = express();


app.use(bodyParser.json());
app.use(session({ secret: "mi-secreto", resave: false, saveUninitialized: false }));


app.use("/", rutasUsuarios);


app.get("/", (req, res) => {
  if (req.session.usuario) {
    res.send(`
      <h1>Bienvenido, ${req.session.usuario.nombre}</h1>
      <a href="/dashboard">Ir al Dashboard</a>
      <form action="/logout" method="POST"><button>Cerrar sesión</button></form>
    `);
  } else {
    res.send(`
      <h1>Página de inicio</h1>
      <form action="/login" method="POST">
        <input type="text" name="usuario" placeholder="Usuario" required />
        <input type="password" name="contraseña" placeholder="Contraseña" required />
        <button>Iniciar sesión</button>
      </form>
    `);
  }
});


app.get("/dashboard", verificarToken);


app.listen(3000, () => console.log("Servidor iniciado en http://localhost:3000"));
