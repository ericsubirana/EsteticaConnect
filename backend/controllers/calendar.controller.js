const Calendar = require('../models/calendar.model.js')
const HistoryCalendar = require('../models/history.model.js')
const mongoose = require('mongoose')
const cron = require('node-cron');
const moment = require('moment-timezone');
const { whatsapp } = require('../libs/whatsapp.js')
require("dotenv").config();
const axios = require('axios')


const insertEvent = async (req, res) => {
    try {
        const event = new Calendar(req.body);
        await event.save();
        if(req.body.sendMessage)
        {
            try {
                const templateName = "ce_fina_alert";
                const tel = event.clientPhoneNumber;
                const chatId = await whatsapp.getNumberId(tel);
                const date = new Date(event.day);
                // Agafem el mes i el dia
                const day = String(date.getUTCDate()).padStart(2, '0');
                const monthNumber = String(date.getUTCMonth());
                const monthNames = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];
                const monthName = monthNames[monthNumber];
                //const mensaje = `Hola ${event.clientName} tens hora a les ${event.startHour} per ${event.description} el dia ${day} de ${monthName}`;
                //const m = await whatsapp.sendMessage(chatId._serialized, mensaje);
                //const mensaje = `Hola ${event.clientName} tens hora a les ${event.startHour} per ${event.description} el dia ${day} de ${monthName}`;
                //const m = await whatsapp.sendMessage(chatId._serialized, mensaje);
                await sendTextMessage(tel, templateName, event.clientName, event.startHour, event.description, day, monthName);
            } catch (error) {
                console.error('Error al enviar mensaje:', error);
            }
        }
        res.status(200).json({ message: 'Evento creado correctamente' })
    } catch (error) {
        res.status(400).json({ message: 'error creando el evento' + error})
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
        await Calendar.updateOne({ _id: id }, { $set: values });
        try {
            const templateName = "update_event"
            const tel = values.clientPhoneNumber;
            const chatId = await whatsapp.getNumberId(tel);
            const date = new Date(values.day);
            // Agafem el mes i el dia
            const day = String(date.getUTCDate()).padStart(2, '0');
            const monthNumber = String(date.getUTCMonth());
            const monthNames = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];
            const monthName = monthNames[monthNumber];
            //const mensaje = `Hola ${values.clientName} s'ha actualitzat el teu esdeveniment i tens hora a les ${values.startHour} per ${values.description} el dia ${day} de ${monthName}`;
            //await whatsapp.sendMessage(chatId._serialized, mensaje);
            await sendTextMessage(tel, templateName, values.clientName, values.startHour, values.description, day, monthName);
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

async function sendTextMessageTomorrow(tel, nameParam, startHour, description) {
    const response = await axios({
        url: 'https://graph.facebook.com/v21.0/'+process.env.TEL_ID+'/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ` + process.env.WHATSAPP_API_TOKEN,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: "individual",
            to: '34'+tel,
            type: 'template',
            template:{
                name: 'event_detals_remainder_fina',
                language:{
                    code:"ca"
                },
                components : [
                    {
                        type:"body",
                        parameters:[
                            {
                                type:"text",
                                text:nameParam 
                            },
                            {
                                type:"text",
                                text:startHour
                            },
                            {
                                type:"text",
                                text:description
                            }
                        ]
                    }
                ],
            }
        })
    })
    return response
}

async function sendTextMessage(tel, templateName, nameParam, startHour, description, day, month) {
    await axios({
        url: 'https://graph.facebook.com/v21.0/'+process.env.TEL_ID+'/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ` + process.env.WHATSAPP_API_TOKEN,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: "individual",
            to: '34'+tel,
            type: 'template',
            template:{
                name: templateName,
                language:{
                    code:"ca"
                },
                components : [
                    {
                        type:"body",
                        parameters:[
                            {
                                type:"text",
                                text:nameParam 
                            },
                            {
                                type:"text",
                                text:startHour
                            },
                            {
                                type:"text",
                                text:description
                            },
                            {
                                type:"text",
                                text:day
                            },
                            {
                                type:"text",
                                text:month
                            }
                        ]
                    }
                ],
            }
        })
    })
}

cron.schedule('0 8 * * * ', async () => {
    moment.tz.setDefault('UTC');
    const tomorrowStart = moment().add(1, 'day').startOf('day').toISOString();
    const tomorrowEnd = moment().add(1, 'day').endOf('day').toISOString();
    
    try {
      if (whatsapp.info && whatsapp.info.wid) {  // Check if the client is connected
        const tomorrowEvents = await Calendar.find({
          day: { $gte: tomorrowStart, $lt: tomorrowEnd }
        });
        console.log('Eventos de mañana:', tomorrowEvents);
        for (const event of tomorrowEvents) {
          try {
            const tel = event.clientPhoneNumber;
            //const chatId = await whatsapp.getNumberId(tel);
            //const mensaje = `Hola ${event.clientName} dema tens hora a les ${event.startHour} per ${event.description}`;
            //const mensaje = `Hola ${event.clientName} dema tens hora a les ${event.startHour} per ${event.description}`;
            await new Promise(resolve => setTimeout(resolve, 250));
            //await whatsapp.sendMessage(chatId._serialized, mensaje);
            await sendTextMessageTomorrow(tel, event.clientName, event.startHour, event.description);
          } catch (error) {
            console.error('Error al enviar mensaje:', error);
          }
        }
      } else {
        console.log('WhatsApp client is not ready.');
      }
    } catch (error) {
      console.error('Error al realizar la consulta:', error.message);
    }
  });
  

cron.schedule('0 8 * * 7', async () => { //borra els events de la setmana abans i els guarda en una col.lecció apart
    moment.tz.setDefault('UTC');
    const pastWeekStart = moment().subtract(7, 'day').startOf('day').toISOString();
    const pastWeekEnd = moment().subtract(1, 'day').endOf('day').toISOString();
    try {
        //primer agafem tots aquells events que són d'ahir
        const pastWeekEvents = await Calendar.find({
            day: { $gte: pastWeekStart, $lt: pastWeekEnd }
        });
        for (const eventOfWeek of pastWeekEvents) {
            try {
                const { _id, ...eventWithoutId } = eventOfWeek.toObject();
                const event = new HistoryCalendar(eventWithoutId);
                await event.save();
                //ara que ja ho hem guardat, ens dispossem a borrar-ho
                const idsToDelete = pastWeekEvents.map(event => event._id);
                await Calendar.deleteMany({ _id: { $in: idsToDelete } });
            } catch (error) {
                console.error('Error al guardar los eventos de la semana:', error);
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
                const date = new Date(event.day);
                // Agafem el mes i el dia
                const day = String(date.getUTCDate()).padStart(2, '0');
                const monthNumber = String(date.getUTCMonth());
                const monthNames = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];
                const monthName = monthNames[monthNumber];
                //const mensaje = `Hola ${event.clientName} aquesta setmana tens hora a les ${event.startHour} per ${event.description} el dia ${day} de ${monthName}`;
                await new Promise(resolve => setTimeout(resolve, 250));
                await sendTextMessage(tel, templateName, event.clientName, event.startHour, event.description, day, monthName);
                //await whatsapp.sendMessage(chatId._serialized, mensaje);
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