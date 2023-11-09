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
app.post("/organizacion", async (req, res) => {
  const organizacion = await prisma.organizacion.create({
    data: {
      nombre: req.body.nombre,
      areVulnerable: req.body.areVulnerable,
      ubicacion: req.body.ubicacion,
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
