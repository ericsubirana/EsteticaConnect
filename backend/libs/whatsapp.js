const qrcode = require('qrcode-terminal');
const { Client, LocalAuth  } = require('whatsapp-web.js');
const cron = require('node-cron')

const whatsapp = new Client({
    puppeteer: {
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	},
  authStrategy: new LocalAuth()
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
	if(message.body === '!ping') {
		message.reply('pong');
	}
});

module.exports = {whatsapp};