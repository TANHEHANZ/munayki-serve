const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const secretKey = "joshdesgraciadomehacehacerbackendsecretkey";

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        correo: email,
      },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const accessToken = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

module.exports = app;
