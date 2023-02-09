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
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
        },
        url: {
            type: String,
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
    views: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
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
    }
})

let Product = mongoose.model("Product", productSchema)
module.exports = Product;