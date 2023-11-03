const express = require("express");
const { PrismaClient } = require("@prisma/client")
const app = express();
const prisma = new PrismaClient();



app.get('/user', async (req, res) => { 
    try {
        const usuarios = await prisma.usuario.findMany({
        });
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

app.post('/user', async (req, res) => {
    try {
      const newuser = await prisma.usuario.create({
        data: {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          edad: req.body.edad,
          telefono: req.body.telefono,
          carnet: req.body.carnet,
          correo: req.body.correo,
          password: req.body.password,
          rol: req.body.rol,
          genero: req.body.genero,
        },
      });
  
      res.json({
        message: "sucessully create",
        data: newuser,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  });
app.put('/user/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const userUpdate= await prisma.usuario.update({
        where:{
            id,
        },
        data:{
            nombre,
            AlertasUsuario,
            apellido,
            carnet,
            correo,
            edad,
            genero,
            telefono,
            password,
            Organizacion,
            rol,
        }
    });
    res.json({
        message:"successully update",
        data:userUpdate
    })
});
app.delete('/user/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const userUpdate= await prisma.usuario.delete({
        where:{
            id,
        }
    });
    res.json({
        message:"successully delete",
        data:userUpdate
    })
});

module.exports=app