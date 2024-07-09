const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const whatsapp = new Client({
  puppeteer: {
    args: [
      '--no-sandbox'
    ],
  },
  authStrategy: new LocalAuth({
    clientId: "client-one"
  }),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
}
});

whatsapp.on('qr', qr => {
  qrcode.generate(qr, {
    small: true
  });
});

whatsapp.on('ready', async () => {
  console.log('Client is ready!');
});

whatsapp.on('message', message => {
  if (message.body === '!ping') {
    message.reply('pong');
  }
});

module.exports = { whatsapp };