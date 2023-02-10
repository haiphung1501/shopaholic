const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");

const productController = {
    getAllProduct : async (req,res) => {
        try {
            const products = await Product.find();
            res.status(200).send(products);
        } catch (err) {res.status(500).json(err)}

    },

    getProduct : async(req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product not found", 404))
            }

            res.status(200).json(product);
        }catch (err) {
            res.status(500).json(err);
        }
    },

    createProduct : async (req, res) => {
        try {
            req.body.user = req.user.id;
            const newProduct = new Product(req.body)
            const savedProduct = await newProduct.save()
            res.status(200).json(savedProduct);
        } catch (err) { res.status(500).json(err) }
    },
    updateProduct : async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            await product.updateOne({$set: req.body});
            res.status(200).json("Update Successfully");
        }catch(err) {
            res.status(500).json(err);
        }
    },
    deleteProduct : async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successfully");
        }catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = productController;