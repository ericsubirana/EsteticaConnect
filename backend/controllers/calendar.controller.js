const Calendar = require('../models/calendar.model.js')
const mongoose = require('mongoose')

const insertEvent = async (req, res) => {
    try {
        const event = new Calendar(req.body);
        await event.save();
        res.status(200).json({ message: 'Evento creado correctamente' })
    } catch (error) {
        res.status(400).json({ message: 'error creando el evento' })
    }
}

const takeEvents = async (req,res) => {
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
        const events = await Calendar.find({_id : req.params.id});
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateEvent = async (req, res) => {
    try {
        const { id, values } = req.body;
        await Calendar.updateOne({_id : id}, {$set: values});
        res.status(200).json({message: 'Evento editado'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteEvent = async (req, res) => {
    try {
        await Calendar.deleteOne({ _id: req.params.id });
        res.status(200).json({message: 'Evento eliminado'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Evento no encontrado' });
    }
}

module.exports = { insertEvent, takeEvents, takeSpecificEvent, updateEvent, deleteEvent }