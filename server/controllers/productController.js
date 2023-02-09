const Product = require("../models/product");

const productController = {
    getAllProduct : async (req,res) => {
        console.log("Success")
    },

    createProduct : async (req, res) => {
        try {
            const newProduct = new Product(req.body)
            const savedProduct = await newProduct.save()
            res.status(200).json(savedProduct);
        } catch (err) { res.status(500).json(err) }
    },
}

module.exports = productController;