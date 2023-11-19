const Product = require('../models/product.model.js')

const randomProducts = async (req, res) => {
    try {
        const randomProducts = await Product.aggregate([
            { $sample: { size: 6 } } 
        ]);
        console.log(randomProducts)
        res.status(200).json(randomProducts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const findCollections = async (req, res) => {
    try{
        const collectionName = req.body.collection;
        const products = await Product.find({collection: collectionName});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const findCategory = async (req, res) => {
    try{
        const categoryName = req.body.category;
        const products = await Product.find({category: categoryName});
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {randomProducts, findCollections, findCategory}