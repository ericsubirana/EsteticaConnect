const { Router } = require('express');
const { whatsapp } = require('../libs/whatsapp.js')
const router = Router();

router.post('/enviarMensaje', async (req, res) => {
    try {
        const tel = '696156241';
        const chatId = await whatsapp.getNumberId(tel)
        const mensaje = "Prova Whatsapp Automàtica, hola mama";
        console.log(chatId)
        await whatsapp.sendMessage(chatId._serialized, mensaje);
        res.json({ res: true });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ res: false, message: 'Error interno del servidor' });
    }
});

module.exports = router;