const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
    let products
    try {
        products = await Product.find().sort({ createAt: 'desc' }).limit(10).exec()
    } catch (error) {
        products = []
    }
    res.render('index', {products: products})
})

module.exports = router