const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: [true,"Please enter product name"]
    },
    description: {
        type:String
    },
    price: {
        type: Number,
        maxLength: 8
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
        },
        url: {
            type: String,
            default: "https://static.thenounproject.com/png/2503776-200.png"
        }
    }],
    category: {
        type: String,
    },
    stock: {
        type: Number,
        maxLength: 4,
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
            name: {
                type:String,
            },
            rating: {
                type: Number,
            },
            comment: {
                type:String,
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    }
})

let Product = mongoose.model("Product", productSchema)
module.exports = Product;