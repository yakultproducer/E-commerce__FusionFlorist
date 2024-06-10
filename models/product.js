const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now
    },

})


module.exports = mongoose.model('Product', productSchema)