const Calendar = require('../models/calendar.model.js')
const mongoose = require('mongoose')
const cron = require('node-cron');
const moment = require('moment-timezone');
const { whatsapp } = require('../libs/whatsapp.js')


const insertEvent = async (req, res) => {
    try {
        console.log(req.body)
        const event = new Calendar(req.body);
        await event.save();
        //ara enviem missatge al client
        try {
            const tel = event.clientPhoneNumber;
            const chatId = await whatsapp.getNumberId(tel);
            const mensaje = `Hola ${event.clientName} dema tens hora a les ${event.startHour} per ${event.description}`;
            await whatsapp.sendMessage(chatId._serialized, mensaje);
            console.log('Mensaje enviado:', mensaje);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        }
        res.status(200).json({ message: 'Evento creado correctamente' })
    } catch (error) {
        res.status(400).json({ message: 'error creando el evento' })
    }
}

const getAllContacts = async (client) => {
    let contacts = await client.getContacts();
    return contacts;
}

const takeContacts = async (req, res) => {
    let clientPhones = {};
    let contacts = await getAllContacts(whatsapp);
    contacts = contacts.filter(contact => !contact.isGroup && contact.isMyContact && contact.id.user.startsWith('34'));
    contacts.forEach(contact => {
        const phoneNumber = contact.id.user;
        const clientName = contact.name;
        clientPhones[clientName] = phoneNumber;
    });
    console.log(clientPhones)
    res.status(200).json(clientPhones);
}

const takeEvents = async (req, res) => {
    try {
        const events = await Calendar.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const takeSpecificEvent = async (req, res) => {
    try {
        const events = await Calendar.find({ _id: req.params.id });
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateEvent = async (req, res) => {
    try {
        const { id, values } = req.body;
        console.log(values)
        await Calendar.updateOne({ _id: id }, { $set: values });
        try {
            const tel = values.clientPhoneNumber;
            const chatId = await whatsapp.getNumberId(tel);
            const mensaje = `Hola ${values.clientName} s'ha actualitzat el teu esdeveniment i demà tens hora a les ${values.startHour} per ${values.description}`;
            await whatsapp.sendMessage(chatId._serialized, mensaje);
            console.log('Mensaje enviado:', mensaje);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        }
        res.status(200).json({ message: 'Evento editado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteEvent = async (req, res) => {
    try {
        await Calendar.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Evento eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Evento no encontrado' });
    }
}

cron.schedule('0 8 * * * ', async () => { //0 8 * * *     */15 * * * * *
    moment.tz.setDefault('UTC');
    const tomorrowStart = moment().add(1, 'day').startOf('day').toISOString();
    const tomorrowEnd = moment().add(1, 'day').endOf('day').toISOString();
    try {
        //primer agafem tots aquells events que són per demà
        const tomorrowEvents = await Calendar.find({
            day: { $gte: tomorrowStart, $lt: tomorrowEnd }
        });
        console.log('Eventos de mañana:', tomorrowEvents);
        for (const event of tomorrowEvents) {
            try {
                const tel = event.clientPhoneNumber;
                const chatId = await whatsapp.getNumberId(tel);
                const mensaje = `Hola ${event.clientName} dema tens hora a les ${event.startHour} per ${event.description}`;
                await whatsapp.sendMessage(chatId._serialized, mensaje);
                console.log('Mensaje enviado:', mensaje);
            } catch (error) {
                console.error('Error al enviar mensaje:', error);
            }
        }

    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
    }
});

cron.schedule('0 8 * * 6', async () => { //dissabte avisa a totes les persones de la següent setmana
    moment.tz.setDefault('UTC');
    const tomorrowStart = moment().add(2, 'day').startOf('day').toISOString();
    const tomorrowEnd = moment().add(7, 'day').endOf('day').toISOString();
    try {
        //primer agafem tots aquells events que són per demà
        const tomorrowEvents = await Calendar.find({
            day: { $gte: tomorrowStart, $lt: tomorrowEnd }
        });
        console.log('Eventos de esta setmana:', tomorrowEvents);
        for (const event of tomorrowEvents) {
            try {
                const tel = event.clientPhoneNumber;
                const chatId = await whatsapp.getNumberId(tel);
                const mensaje = `Hola ${event.clientName} aquesta setmana tens hora per ${event.description}`;
                await whatsapp.sendMessage(chatId._serialized, mensaje);
                console.log('Mensaje enviado:', mensaje);
            } catch (error) {
                console.error('Error al enviar mensaje:', error);
            }
        }

    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
    }
});


module.exports = { insertEvent, takeEvents, takeSpecificEvent, updateEvent, deleteEvent, takeContacts }