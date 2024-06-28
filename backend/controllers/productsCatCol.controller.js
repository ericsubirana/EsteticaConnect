const ProductsCatCol = require('../models/productCatCol.model.js');

const getCatCol = async (req, res) => {
    try {
        const CatAndCol = await ProductsCatCol.find({});
        if (!CatAndCol.length) {
            return res.status(404).json({ message: 'CatAndCol not found' });
        }
        res.status(200).json(CatAndCol);
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


module.exports = { getCatCol };

