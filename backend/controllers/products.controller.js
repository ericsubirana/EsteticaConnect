const Product = require('../models/product.model.js')

const randomProducts = async () => {
    const title = "SEBOCONTROL Anti-Blemish Gel";
    const product = await Product.findOne({title});
    console.log(product);
}

module.exports = {randomProducts}