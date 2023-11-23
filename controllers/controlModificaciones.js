const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/modificacion", async (req, res) => {
  const modificaciones = await prisma.modificacion.findMany();
  res.send(modificaciones);
});

app.get("/mod", async (req, res) => {
  const modificaciones = await prisma.modificacion.findMany({
    include: {
      usuario: true,
    },
  });
  res.send(modificaciones);
});

app.post("/modificacion/:organizacionId/:multimediaId", async (req, res) => {
  try {
    const { organizacionId, multimediaId } = req.params;
    const modificacion = await prisma.modificacion.create({
      data: {
        fecha: new Date(),
        organizacionId: organizacionId ? parseInt(organizacionId) : undefined,
        multimediaId: multimediaId ? parseInt(multimediaId) : undefined,
      },
    });

    res.json({
      message: "Successfully created",
      data: modificacion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la modificación" });
  }
});

module.exports = app;
