const express = require('express');
const {
  PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.get('/ubicacion', async (req, res) => {
  const ubicacion = await prisma.ubicacion.findMany();
  res.json(ubicacion);
});

app.post('/ubicacion', async (req, res) => {
  try {
    const {
      longitud,
      latitud
    } = req.body;
    if (!longitud || !latitud) {
      return res.status(400).json({
        error: 'longitud y latitud son obligatorios'
      })
    }
    const nuevaUbicacion = await prisma.ubicacion.create({
      data: {
        longitud,
        latitud
      },
    });
    res.status(201).json(nuevaUbicacion);

  } catch (error) {
    console.error('Error al crear la unicacion', error);
    res.status(500).json({
      error: 'Hubo un error al crear la ubicacion'
    });
  }
});

app.put('/ubicacion/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      longitud,
      latitud
    } = req.body;
    if (!longitud || !latitud) {
      return res.status(400).json({
        error: 'longitud y latitud son obligatorios'
      })
    }
    const ubicacionActualizada = await prisma.ubicacion.update({
      where: {
        id
      },
      data: {
        longitud,
        latitud,
      },
    });
    res.json(ubicacionActualizada);
    res.json("Ubicacion actualizada");
  } catch (error) {
    console.error("error al actualizar los datos");
  }
});

app.delete('/ubicacion/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const ubicacionExistente = await prisma.ubicacion.findUnique({
      where: {
        id
      },
    });
    if (!ubicacionExistente) {
      res.status(404).json({
        error: 'Ubicacion no encontrada'
      });
    }
    await prisma.ubicacion.delete({
      where: {
        id
      },
    });
    res.json({
      message: 'Ubicacion eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar la ubicacion');
    res.status(500).json({
      error: 'Hubo un error al eliminar ubicacion'
    });
  }
})
module.exports = app