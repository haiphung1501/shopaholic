const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get("/", productController.getAllProduct);

router.post("/", productController.createProduct);

module.exports = router