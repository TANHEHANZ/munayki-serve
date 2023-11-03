const express = require("express");
const {
    PrismaClient
} = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.get('/multimedia', async (req, res) => {
    const multimetida = await prisma.multimedia.findMany();
    res.send(multimetida);
});

app.post('/multimedia', async (req, res) => {
    const multimedia = await prisma.multimedia.create({
        data: {
            foto: req.body.foto,
            AlertasUsuario: req.body.AlertasUsuario,
        }
    });
    res.json({
        message: "successully created",
        data: multimedia
    })
})
app.put('/multimedia', async (req, res) => {
    const id = parseInt(req.params.id);
    const multimedia = await prisma.multimedia.update({
        where: {
            id
        },
        data: {
            AlertasUsuario,
            foto
        },
    });
    res.json({
        message: "Successully update",
        data: multimedia
    });
});

app.delete('/multimedia/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const multimedia= await prisma.multimedia.delete({
    where:{
        id
    }
    });
    res.json({
        message:"successully delete",
        data:multimedia
    })
})

module.exports=app