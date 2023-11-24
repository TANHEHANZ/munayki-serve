const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

app.get("/organizacion", async (req, res) => {
  const organizacion = await prisma.organizacion.findMany({
    include: {
      usuario: true,
    },
  });
  res.send(organizacion);
});

app.get("/modificacion/:organizacionId/:multimediaId", async (req, res) => {
  try {
    const { organizacionId, multimediaId } = req.params;
    const modificaciones = await prisma.modificacion.findMany({
      where: {
        organizacionId: organizacionId ? parseInt(organizacionId) : undefined,
        multimediaId: multimediaId ? parseInt(multimediaId) : undefined,
      },
      include: {
        usuario: true,
      },
    });

    res.json({
      message: "Successfully fetched",
      data: modificaciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las modificaciones" });
  }
});

app.get("/modificacionuncluye", async (req, res) => {
  try {
    const modificaciones = await prisma.modificacion.findMany({
      include: {
        organizacion: true,
        multimedia: true,
      },
    });

    res.json({
      message: "Successfully fetched",
      data: modificaciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las modificaciones" });
  }
});





app.post("/organizacion", async (req, res) => {
  const usuarioId = req.body.usuarioId;
  const organizacion = await prisma.organizacion.create({
    data: {
      nombre: req.body.nombre,
      areVulnerable: req.body.areVulnerable,
      ubicacion: req.body.ubicacion,
      usuario: { connect: { id: usuarioId } },
    },
  });
  res.json({
    message: "successully created",
    data: organizacion,
  });
});
app.put("/organizacion/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const organizacionActualizada = await prisma.organizacion.update({
    where: {
      id,
    },
    data: {
      areVulnerable,
      nombre,
      ubicacion,
    },
  });
  res.json(organizacionActualizada);
});
app.delete("/organizacion/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = await prisma.organizacion.delete({
    where: {
      id: id,
    },
  });
  res.json({
    message: "succesfully deleted",
    data: deleted,
  });
});

module.exports = app;
