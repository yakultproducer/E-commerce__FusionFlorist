const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
   
    res.render('about/index')
})

module.exports = router