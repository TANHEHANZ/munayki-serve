const express = require("express");
const bodyParser = require("body-parser");
const { Twilio } = require("twilio");
const nodemailer = require("nodemailer");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const twilioClient = new Twilio(
  "ACb370777152d53ac0a07c878fc889a9a5",
  "ba1fa45843855fb22c11c73e5d9b4c1f"
);

app.post("/send-whatsapp", async (req, res) => {
  const { message, phone } = req.body;

  try {
    await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phone}`,
      body: message,
    });
    res.status(200).send("Message sent successfully!");
    console.log(res);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Error sending message");
  }
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "cbbe.hanzlimber.tapia.ch@unifranz.edu.bo",
    pass: "CMRWx#0e90",
  },
});

app.post("/send-email", (req, res) => {
  const { subject, body, to } = req.body;

  const mailOptions = {
    from: "programacion",
    to: to,
    subject: subject,
    text: `Texto: ${body}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error al enviar el correo");
    } else {
      console.log("Correo enviado: " + info.response);
      res.status(200).json({ message: "Correo enviado correctamente" });
    }
  });
});

// app.get('/qr', async (req, res) => {
//   const isConnected = clientqr.ready;

//   if (isConnected) {
//       res.send('El cliente de WhatsApp está conectado');
//   } else {
//       res.send('El cliente de WhatsApp no está conectado');
//   }
// });

module.exports = app;
