const Product = require("../models/product");

const productController = {
    getAllProduct : async (req,res) => {
        try {
            const products = await Product.find();
            res.status(200).send(products);
        } catch (err) {res.status(500).json(err)}

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