const dbConnector = require("../models/dbc").get()

exports.createProduct = async (req, res, next) => {
    try {
        const product = await dbConnector.Product.findOne({where : { name : req.body.name }})
        if(product) {
            return res.status(405).send({
            message : "roduct already existing"
        })
        }
        dbConnector.Product.create(req.body)
            .then(() => {
                res.status(201).send({
                    message : req.body.name + " created"
                })
            })
            .catch((err) => {
                res.status(400).send({
                    message : "proprty missing"
                })
            })
    } catch (err) {
        res.json(err)
    }
}

exports.getAllProduct = async (req, res, next) => {
    try {
        const allProduct = await dbConnector.Product.findAll()
        res.status(200).json(allProduct)
    } catch (err) {
        res.json(err)
    }
}
exports.updateProduct = async (req , res, next) => {
    try {
        const product = await dbConnector.Product.findByPk(req.params.id)
        if(product) {
            product.update(req.body)
                .then(() => {
                    res.status(200).send({
                        message : "Product updated"
                    })
                })
                .catch(() => {
                    res.status(400).send({
                        message : "Error updating product"
                    })
                })
        } else {
            res.status(404).send({
                message : "Product not found"
            })
        }
    } catch (err) {
        res.json(err)
    }
}