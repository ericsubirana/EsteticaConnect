const Product = require('../models/product.model.js')

const randomProducts = async (req, res) => {
    try {
        const randomProducts = await Product.aggregate([
            { $sample: { size: 6 } }
        ]);
        res.status(200).json(randomProducts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const findCollections = async (req, res) => {
    try {
        const collectionName = req.body.collection;
        const products = await Product.find({ collection: collectionName });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const findCategory = async (req, res) => {
    try {
        const categoryName = req.body.category;
        const products = await Product.find({ category: categoryName });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const searchProducts = async (req, res) => {

    const productName = req.body.name.toLowerCase().replace(/\s+/g, ' ').trim();
    try{
        const querySnapshot = await Product.find({ title: { $regex: `^${productName}`, $options: 'i' } });
        res.status(200).json(querySnapshot);
    } catch (error) {
        console.error('Error retrieving data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } 
 
}

module.exports = { randomProducts, findCollections, findCategory, searchProducts }