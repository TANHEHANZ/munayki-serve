const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.get("/resultadosCuestionario", async (req, res) => {
  try {
    const resultados = await prisma.resultadoCuestionario.findMany({});

    res.json(resultados);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        { error: "Error al obtener los resultados del cuestionario." },
        error
      );
  }
});

app.post("/resultadosCuestionario", async (req, res) => {
  const { puntuacion, respuestas } = req.body;

  try {
    const resultado = await prisma.resultadoCuestionario.create({
      data: {
        puntuacion,
        respuestas,
        usuarioId,
        usuarioNombre: usuarioNombre || "Anónimo",
      },
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "No se pudieron guardar los resultados del cuestionario.",
    });
  }
});
// app.post("/resultadosCuestionario", async (req, res) => {
//   const { puntuacion, respuestas } = req.body;
//   const token = req.header("Authorization");

//   try {
//     let usuarioId = null; 

//     if (token) {
//       const decodedToken = jwt.verify(token, "123");
//       usuarioId = decodedToken.id;
//     }

//     const resultado = await prisma.resultadoCuestionario.create({
//       data: {
//         puntuacion,
//         respuestas,
//         usuarioId,
//         usuarioNombre: usuarioId ? "Usuario Registrado" : "Anónimo",
//       },
//     });

//     res.json(resultado);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "No se pudieron guardar los resultados del cuestionario.",
//     });
//   }
// });

app.get("/resultado-cuestionario/:id", async (req, res) => {
  const resultadoId = parseInt(req.params.id);

  try {
    const resultado = await prisma.resultadoCuestionario.findUnique({
      where: { id: resultadoId },
    });

    if (!resultado) {
      res
        .status(404)
        .json({ error: "Resultado del cuestionario no encontrado." });
      return;
    }

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener el resultado del cuestionario." });
  }
});
module.exports = app;
