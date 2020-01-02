const express = require('express')
const productsRouter = express.Router()
const uuid = require('uuid/v4')
const Products = require('../models/product')

// Posting
productsRouter.post('/', (req, res) => {
    req.body._id = uuid()
    const newProduct = new Products(req.body)
    newProduct.save((err, product) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(201).send(product)
    })
})

//Delete
productsRouter.delete('/:_id', (req, res) => {
    Products.findOneAndRemove({ _id: req.params._id }, (err, product) => {
        if (err) {
            res.status(500).send(err)
        }
        const response = {
            message: "Piece successfully removed.",
            id: product._id
        }
        return res.status(200).send(response)
    })
})

//Put Edit
productsRouter.put("/:_id", (req, res) => {
    Products.findOneAndUpdate(
        { _id: req.params._id },
        req.body,
        { new: true },
        (err, updatedProduct) => {
            if (err) {
                res.status(500)
                return res.send(err)
            }
            return res.status(201).send(updatedProduct)
        }
    )
})