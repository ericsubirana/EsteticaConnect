const Product = require('../models/product.model.js')

const randomProducts = async (req, res) => {
    try {
        const randomProducts = await Product.aggregate([
            { $sample: { size: 6 } } //SAMPLE MOLT IMPORTANT
        ]);
        res.status(200).json(randomProducts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {randomProducts}