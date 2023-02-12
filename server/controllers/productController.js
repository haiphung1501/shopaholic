const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

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
    },
    createReview: catchAsyncError(async (req,res,next) => {
        console.log(req.body);
        console.log("Her323e")

        const {rating, comment, productId} = req.body;

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        }
        console.log("Here")
        const product = await Product.findById(productId);
        console.log(product)
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
        })
    }),

    getProductReviews : catchAsyncError( async (req,res,next) => {
        const product = await Product.findById(req.query.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews,
        })
    }),

    deleteReview : catchAsyncError( async (req,res,next) => {
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
}

module.exports = productController;