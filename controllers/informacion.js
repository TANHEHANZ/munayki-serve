const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/info", async (req, res) => {
  try {
    const informacion = await prisma.informacion.findMany({});
    res.json(informacion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error al traer datos de informacion" });
  }
});

app.post("/info", async (req, res) => {
  try {
    const informacion = await prisma.informacion.create({
      data: req.body,
    });
    res.json({
      message: "creado exitosamiente",
      data: informacion,
    });
  } catch (error) {
    res.status(500).json({ error: "error al crear datos" + error });
  }
});

app.put("/info/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const updateInfo = await prisma.informacion.update({
      where: {
        id,
      },
      data: req.body,
    });
    res.json({
      message: "actualizado de forma correcta ",
      data: updateInfo,
    });
  } catch (error) {
    res.status(500).json({ error: "error actualizar datos" + error });
  }
});

app.delete("/info/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteInfo = await prisma.informacion.delete({
      where: {
        id,
      },
    });
    res.json({
      message: "registro eliminado",
      data: deleteInfo,
    });
  } catch (error) {
    res.status(500).json({ error: "error" + error });
  }
});

module.exports = app;
