const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
mongoose.set('strictQuery', true);

const productRoute = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');

const errorMiddleware = require('./middlewares/error');

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use(errorMiddleware);

app.use("/api/product", productRoute);
app.use("/api/user", userRouter);



mongoose.connect(process.env.DB_URL, () => {
    console.log("Connected to MongoDB");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is working on PORT: ${process.env.PORT}`);
})