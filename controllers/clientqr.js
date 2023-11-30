const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
    // Mostrar el código QR en la consola para escanearlo con la app de WhatsApp
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log(client)
    console.log('¡Cliente listo para enviar mensajes!');
    // Aquí puedes enviar mensajes o realizar otras acciones una vez que el cliente esté listo
});

client.initialize();

module.exports = client;
