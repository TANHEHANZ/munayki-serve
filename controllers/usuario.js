const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();
const usuarioSchema = require("../validations/usuarioSchema");

app.get("/user", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({});
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.post("/user", async (req, res) => {
    const existingUser = await prisma.usuario.findUnique({
      where: {
        correo: req.body.correo,
      },
    });
    if (existingUser) {
      return res.message.json({
        message: "El correo electrónico ya está en uso",
      });
    }
    const newUsuario = await prisma.usuario.create({
      data: req.body,
    });
    res.json({
      message: "Usuario creado exitosamente",
      data: newUsuario,
    });
 
});

app.put("/user/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const userUpdate = await prisma.usuario.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.json({
      message: "Successfully updated",
      data: userUpdate,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.delete("/user/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const userUpdate = await prisma.usuario.delete({
    where: {
      id,
    },
  });
  res.json({
    message: "successully delete",
    data: userUpdate,
  });
});

module.exports = app;
