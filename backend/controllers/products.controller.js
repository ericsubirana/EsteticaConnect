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

const editProduct = async (req, res) => {
    const product = req.body.product;
    try{
        const editSnapshot = await Product.updateOne(
            {_id: product.productId},
            {
                $set: {
                    title:product.productTitle,
                    description:product.productDescription,
                    "img-src":product.productImage,
                    price:product.productPrice,
                    category:product.productCategory,
                    collection:product.productCollecion
                }
            }
        );
        if (editSnapshot) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error retrieving data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } 
}

const deleteProduct = async (req, res) => {
    const idProduct = req.body.productId;
    try{
        const deleteSnapshot = await Product.deleteOne(
            {_id: idProduct},
        );
        if (deleteSnapshot) {
            res.status(200).json({ message: 'Product removed successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error retrieving data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } 
}

const addProduct = async (req, res) => {
    let {product} = req.body;
    // Validation and transformation
    const validationErrors = [];

    if (!product.title || typeof product.title !== 'string') {
        validationErrors.push('Title is required and must be a string.');
    }

    if (!product.description || typeof product.description !== 'string') {
        validationErrors.push('Description is required and must be a string.');
    }

    if (!product.price || typeof product.price !== 'string') {
        validationErrors.push('Price is required and must be a string.');
    }

    if (!product['img-src'] || typeof product['img-src'] !== 'string') {
        validationErrors.push('Image URL is required and must be a string.');
    }

    if (!product.category || !Array.isArray(product.category)) {
        product.category = []; // Ensure it's an array even if empty
    }

    if (!product.collections || typeof product.collections !== 'string') {
        product.collections = ''; // Ensure it's a string even if empty
    }

    if (validationErrors.length > 0) {
        return res.status(400).json({ error: validationErrors });
    }

    // Create the product object matching the schema
    const newProduct = {
        title: product.title,
        description: product.description,
        price: product.price,
        'img-src': product['img-src'],
        category: product.category,
        collections: product.collections
    };

    try {
        const addSnapshot = await Product.create(newProduct);
        res.status(200).json({ message: 'Product added successfully', product: addSnapshot });
    } catch (error) {
        console.error('Error adding product to MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
    

module.exports = { randomProducts, findCollections, findCategory, searchProducts, editProduct, deleteProduct, addProduct }