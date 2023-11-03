const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const validTokens = new Set();

app.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password) {
    return res.status(400).json({
      error: "Correo y contraseña son obligatorios",
    });
  }
  const user = await prisma.usuario.findFirst({
    where: {
      correo: correo,
    },
  });
  if (!user) {
    res.status(401).json({
      error: "Usuario no encontrado",
    });
  }
  if (password !== user.password) {
    return res.status(401).json({
      error: "Contra incorrecta",
    });
  }
  const userForToken = {
    id: user.id,
    username: user.correo,
  };
  const token = jwt.sign(userForToken, "123");
  res.status(200).json({
    name: user.nombre,
    userName: user.correo,
    token,
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
