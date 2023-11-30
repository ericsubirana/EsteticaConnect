const Cart = require('../models/cart.model.js')
const mongoose = require('mongoose')

const adddProduct = async (req, res) => {
    try {
        const user = req.body.user;
        const product = req.body.product;
        const userCartExistsAlready = await Cart.findOne({ user_id: user.id });
        const userProductCartExistsAlready = await Cart.findOne({
            user_id: user.id,
            'products.product.title': product.title,
        });

        if (userCartExistsAlready) {
            if (userProductCartExistsAlready) { //carret ja existeix i també  el producte (augmentem quantitat)
                //aqui em de mirar si el que volem fer es un delete o un add!!!
                await Cart.updateOne(
                    {
                        user_id: user.id,
                        'products.product.title': product.title,
                    },
                    {
                        $inc: { 'products.$.product.quantity': 1 },
                    });
            }
            else { //carret ja existeix, però el producte encara no
                await Cart.updateOne(
                    {
                        user_id: user.id,
                    },
                    {
                        $addToSet: {
                            'products': {
                                'product': {
                                    title: product.title,
                                    quantity: 1,
                                    price: product.price,
                                    img: product['img-src'],
                                },
                            },
                        },
                    }
                );
            }
        }
        else { //creem carret i afegim producte
            const userId = user.id;
            const productData = {
                title: product.title,
                quantity: 1,
                price: product.price,
                img: product['img-src'],
            };
            const userCart = new Cart({ user_id: userId, products: [{ product: productData }] });
            const cartSaved = await userCart.save();
        }

        res.status(200).send('Product added successfully');
    }
    catch (error) {
        console.error('Error al procesar la solicitud:', error);

        // Si el error es una instancia de ValidationError de Mongoose, imprime los detalles de la validación.
        if (error instanceof mongoose.Error.ValidationError) {
            console.error('Detalles de validación:', error.errors);
        }
    
        res.status(400).send('Error al procesar la solicitud');
    }
}

const hasProduct = async (req, res) => {
    try { //necesitem saber el titol del producte per saber la quantitat que hi ha d'ell en el carret
        const user = req.body.user;
        const product = req.body.product;
        const cartItem = await Cart.findOne(
            { user_id: user.id, 'products.product.title': product.title },
            { 'products.$': 1 }
          );
        if(cartItem){
            res.status(200).json({quantity: cartItem.products[0].product.quantity});
        }
        else{
            res.status(200).json({quantity: 0});
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);

        // Si el error es una instancia de ValidationError de Mongoose, imprime los detalles de la validación.
        if (error instanceof mongoose.Error.ValidationError) {
            console.error('Detalles de validación:', error.errors);
        }
    
        res.status(400).send('Error al procesar la solicitud');
    }
}

module.exports = { adddProduct, hasProduct }