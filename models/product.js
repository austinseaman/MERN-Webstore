const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: String,
    medium: String,
    price: Number,
    description: String,
    _id: String
})

module.exports = mongoose.model("products", productSchema)