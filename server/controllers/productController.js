const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");

const productController = {
  getAllProduct: async (req, res) => {
    try {
      const { search } = req.query;
      const query = search ? { name: { $regex: search, $options: "i" } } : {};
      const products = await Product.find(query);
      const minPrice = Math.min(...products.map((item) => item.price));
      const maxPrice = Math.max(...products.map((item) => item.price));
      const productsCount = await Product.countDocuments(query);
      res.status(200).json({
        success: true,
        products,
        productsCount,
        minPrice,
        maxPrice,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  adminGetAllProduct: catchAsyncError(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  }),
  getAllCategory: catchAsyncError(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.status(200).json({
      success: true,
      categories,
    });
  }),
  getProduct: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createProduct: catchAsyncError(async (req, res, next) => {
    console.log(req.body);
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imageLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imageLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  }),
  updateProduct: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      await product.updateOne({ $set: req.body });
      res.status(200).json("Update Successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteProduct: catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  }),
  createReview: catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    console.log("body ", req.body);
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    console.log(product);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  }),

  getProductReviews: catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }),

  deleteReview: catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  }),
};

module.exports = productController;
