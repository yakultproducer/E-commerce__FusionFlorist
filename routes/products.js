const express = require('express')
const session = require('express-session');
const router = express.Router()
const Product = require('../models/product')

router.use(express.json());

// base products page
router.get('/', async (req, res) => {
    // default values
    const page = parseInt(req.query.page) || 1;
    const limit = 12;

    try {
        // Data Retriving
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);
        const products = await Product.find()
            .sort({ createAt: 'asc' })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        
        if (page > totalPages){
            throw 404;
        }

        res.render('products/index', {
            products: products,
            currentPage: page,
            totalPages: totalPages,
            pagination: getPagination(page, totalPages)
        });
    } catch (error) {
        // console.log(error);
        res.redirect(`/`);
    }
})


router.post('/add-to-cart/:productId', (req, res) => {
    const item = req.params.productId;
    if (!item) {
        return res.status(400).send('Item Is Required');
    }

    // Initialize cart as an empty object if it doesn't exist
    if (!req.session.cart) {
        req.session.cart = {};
    }

    // Check if the item already exists in the cart
    if (req.session.cart[item]) {
        // Increment the quantity if it exists
        req.session.cart[item]++;
    } else {
        // Set the quantity to 1 if it does not exist
        req.session.cart[item] = 1;
    }

    console.log(req.session.cart);
    res.status(200).send(`Added ${item} To Cart`);
});
// Placeholder Create
router.post('/', async (req, res) => {

    const product = new Product({
        name: "Demo",
        price: 10.5,
        quantity: 5,
        description: "This is a description.",
    })

    try {
        const newProduct = await product.save()
        res.redirect(`/`)
    } catch (error) {
        res.redirect(`/`)
    }
    // renderNewPage(res, new Book(), true)
})

function getPagination(currentPage, totalPages) {
    const maxPage = 5;
    let startPage = 1;
    let endPage = totalPages;

    if(totalPages > maxPage){
        if(currentPage <= Math.floor(maxPage/2)){
            // Case 1: Edge case [1],2,3,4,5
            endPage = maxPage
        } else if (currentPage >= totalPages - Math.floor(maxPage/2)) {
            // Case 2: Edge case 1,2,3,[4],5
            startPage = totalPages-maxPage+1
        } else {
            //  Case 3: middle case
            startPage = currentPage - Math.floor(maxPage/2)
            endPage = currentPage + Math.floor(maxPage/2)
        }
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}

module.exports = router