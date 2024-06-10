const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
    const cart = req.session.cart || {};

    if (Object.keys(cart).length === 0) {
        return res.render('cart/index', { cartItems: [] });
    }

    try {
        // Fetch product details from the database
        const productIds = Object.keys(cart);
        const products = await Product.find({ _id: { $in: productIds } });

        // Create an array of cart items with product details and quantities
        const cartItems = products.map(product => ({
            product,
            quantity: cart[product._id]
        }));

        res.render('cart/index', { cartItems });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Internal Server Error');
    }
})

router.delete('/remove-from-cart/:productId', (req, res) => {
    const item = req.params.productId;
    if (!item) {
        return res.status(400).send('Item Does Not Exists.');
    }

    // Initialize cart as an empty object if it doesn't exist
    if (!req.session.cart) {
        return res.status(400).send('Cart Is Empty.');
    }

    // Check if the item already exists in the cart
    if (req.session.cart[item]) {
        // Increment the quantity if it exists
        delete req.session.cart[item];
    } 

    console.log(req.session.cart);
    // res.status(200).json(req.session.cart);
    res.status(200).send(`${item} Removed From Cart`);
});

module.exports = router