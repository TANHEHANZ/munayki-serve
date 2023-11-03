const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

// app.get("/user/contacts", async (req, res) => {

//     const contactos = await prisma.contactos.findMany({});

//     // if (!user) {
//     //   return res.status(404).json({ error: "Usuario no encontrado" });
//     // }

//     // res.json({ user: user, contactos: user.contactos });
//     res.json(contactos);
// });

app.get("/contact", async (req, res) => {
  try {
    const contactos = await prisma.contacto.findMany({});
    res.json(contactos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener contactos" });
  }
});

app.get("/user/:userId/contacts", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      include: {
        contactos: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user.contactos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener contactos" });
  }
});

app.post("/user/:userId/contacts", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const newContact = await prisma.contacto.create({
      data: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        telefono: req.body.telefono,
        relacion: req.body.relacion,
        usuarioId: userId,
      },
    });

    res.json({
      message: "Contacto creado con éxito",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/user/:userId/contacts/:contactId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const contactId = parseInt(req.params.contactId);

    const contact = await prisma.contacto.findUnique({
      where: { id: contactId, usuarioId: userId },
    });

    if (!contact) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    const updatedContact = await prisma.contacto.update({
      where: { id: contactId },
      data: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        telefono: req.body.telefono,
        relacion: req.body.relacion,
      },
    });

    res.json({
      message: "Contacto actualizado con éxito",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


app.delete("/user/:userId/contacts/:contactId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const contactId = parseInt(req.params.contactId);

    const contact = await prisma.contacto.findUnique({
      where: { id: contactId, usuarioId: userId },
    });

    if (!contact) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    await prisma.contacto.delete({
      where: { id: contactId },
    });

    res.json({ message: "Contacto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = app;
