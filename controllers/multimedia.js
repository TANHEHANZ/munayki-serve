const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/multimedia", async (req, res) => {
  const multimetida = await prisma.multimedia.findMany({
    include: {
      usuario: true,
    },
  });
  res.send(multimetida);
});

app.post("/Multimedia", async (req, res) => {
  try {
    const multimedia = await prisma.multimedia.create({
      data: {
        foto: req.body.foto,
        audio: req.body.audio,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        estado: req.body.estado,
        fecha: req.body.fecha,
        usuarioId: req.body.usuarioId,
      },
    });
    res.json({
      message: "Multimedia creada con éxito",
      data: multimedia,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/Multimedia/:iduser", async (req, res) => {
  const iduser = parseInt(req.params.iduser);
  try {
    const userExists = await prisma.usuario.findUnique({
      where: {
        id: iduser,
      },
    });
    if (!userExists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const multimedia = await prisma.multimedia.create({
      data: {
        foto: req.body.foto,
        audio: req.body.audio,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        estado: req.body.estado,
        fecha: req.body.fecha,
        usuarioId: iduser,
      },
    });
    res.json({
      message: "Multimedia creada con éxito para el usuario",
      data: multimedia,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.put("/multimedia/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { foto, audio, longitud, latitud, estado, fecha, usuarioId } = req.body;

  try {
    const multimedia = await prisma.multimedia.update({
      where: { id },
      data: {
        foto,
        audio,
        longitud,
        latitud,
        estado,
        fecha,
        usuarioId,
      },
    });

    res.json({
      message: "Successfully updated",
      data: multimedia,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}); 

app.delete("/multimedia/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const multimedia = await prisma.multimedia.delete({
    where: {
      id,
    },
  });
  res.json({
    message: "successully delete",
    data: multimedia,
  });
});
app.get("/multimedia/:iduser", async (req, res) => {
  const iduser = parseInt(req.params.iduser);
  try {
    const multimedia = await prisma.multimedia.findMany({
      where: {
        usuarioId: iduser,
      },
      include: {
        usuario: true,
      },
    });
    res.json({
      message: "Datos multimedia del usuario recuperados con éxito",
      data: multimedia,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener datos multimedia del usuario",
    });
  }
});

module.exports = app;
