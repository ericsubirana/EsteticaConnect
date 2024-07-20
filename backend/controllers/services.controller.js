const Service = require('../models/service.model.js');

const getCategory = async (req, res) => {
    try {
        const service = req.body.category;
        const categoryService = await Service.find({ category: service });
        if (!categoryService.length) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(categoryService);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error' });
        }
        if (error.name === 'MongoError') {
            return res.status(500).json({ error: 'MongoDB error' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCategories = async (req, res) => {
    try {
        const categoriesServices = await Service.distinct('category');
        if (!categoriesServices.length) {
            return res.status(404).json({ message: 'Categories not found' });
        }
        res.status(200).json(categoriesServices);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error' });
        }
        if (error.name === 'MongoError') {
            return res.status(500).json({ error: 'MongoDB error' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addService = async (req, res) => {
    try {
        const addSnapshot = await Service.create(req.body.service);
        res.status(200).json({ message: 'Service added successfully', service: addSnapshot });
    } catch (error) {
        res.status(500).json({ error: 'Service not added' });
    }
}

const updateService = async (req, res) => {
    try {
        const updateSnapshot = await Service.updateOne({_id:req.body.service.id}, {$set: req.body.service});
        res.status(200).json({ message: 'Service updated successfully', service: updateSnapshot });
    } catch (error) {
        res.status(500).json({ error: 'Service not updated' });
    }
}

const removeService = async (req, res) => {
    try {
        await Service.deleteOne({_id: req.params._id });
        res.status(200).json({ message: 'Service deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: error + ' Service not deleted' });
    }
}



module.exports = { getCategory, getCategories, addService, updateService, removeService };
