const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const validTokens = new Set();

app.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  const login = await prisma.usuario.findFirst({
    where: {
      correo: correo,
      password: password
    },
  });
  if (!login) {
    res.json({
      message: "Usuario no autorizado",
      error: "Usuario no autorizado",
    });
    return;
  }
  login.password = undefined;
  res.json({
    message: "Inicio de sesion correcto",
    data: login,
  });
});

app.post("/logout", (req, res) => {
  const token = req.body.token;
  if (!validTokens.has(token)) {
    validTokens.delete(token);
    res.status(200).json({ message: "Token eliminado correctamente" });
  } else {
    res.status(401).json({ error: "Token no válido" });
  }
});

module.exports = app;
