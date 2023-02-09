const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const productRoute = require('./routes/productRoute');

dotenv.config()

const app = express();

app.use(express.json()); 

app.use("/products", productRoute);



mongoose.connect(process.env.DB_URL, () => {
    console.log("Connected to MongoDB");
})



app.listen(process.env.PORT, () => {
    console.log(`Server is working on PORT: ${process.env.PORT}`);
})