const Service = require('../models/service.model.js');

const getCategory = async (req, res) => {
    try {
        const categoryService = await Service.find({ category : req.body.category });
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

module.exports = { getCategory };
