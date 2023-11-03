const express = require('express');
const {
    PrismaClient
} = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get('/alertausuario', async (req, res) => {
    const alerta = await prisma.alertasUsuario.findMany({
        
    });
    res.json(alerta);
});

app.post('/alertausuario', async (req, res) => {
    const alerta = await prisma.alertasUsuario.create({
        data: {
            usuarioId: req.body.usuarioId,
            multimediaId: req.body.multimediaId,
            ubicacionId: req.body.ubicacionId,
            audio: req.body.audio,
            fecha: req.body.fecha,
            estado: req.body.estado
        }
    });
    res.json({
        message: "successully create",
        data: alerta
    });
});

app.put('/alertausuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const alerta = await prisma.alertasUsuario.update({
        where: {
            id
        },
        data: {
            multimediaId,
            ubicacionId,
            usuarioId,
            audio,
            estado,
            fecha,
        }
    });
    res.json({
        message: "successully update",
        data: alerta
    })
});
app.delete('/alertausuario/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const alerta = await prisma.alertasUsuario.delete({
        where: {
            id
        }
    });
    res.json({
        message: 'successully delete',
        data: alerta
    })
})

module.exports = app;