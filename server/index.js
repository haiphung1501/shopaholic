const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require("cloudinary");
const errorMiddleware = require("./middlewares/error");
mongoose.set("strictQuery", true);

const productRoute = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");

dotenv.config();

const app = express();

const corsOptions = {
  // origin: "https://shopaholic-ni1p.onrender.com",
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const allowCrossDomain = (req, res, next) => {
  // res.header(
  //   `Access-Control-Allow-Origin`,
  //   `https://shopaholic-ni1p.onrender.com`
  // );
  // res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  // res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  // next();

  res.header(
    "Access-Control-Allow-Origin",
    `https://shopaholic-ni1p.onrender.com`
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));
// app.use(allowCrossDomain);
app.use(express.json());

app.use("/api/product", productRoute);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected to MongoDB");
});
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`Server is working on PORT: ${process.env.PORT}`);
});
