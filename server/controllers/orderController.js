const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
};

const orderController = {
  newOrder: catchAsyncError(async (req, res, next) => {
    console.log(req.body);
    const { orderItems, user = req.user._id, totalPrice } = req.body;

    const order = await Order.create({
      orderItems,
      user,
      totalPrice,
    });

    res.status(200).json({
      success: true,
      order,
    });
  }),

  myOrders: catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  }),

  getSingleOrder: catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHandler("No Order Found", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  }),

  getAllOrders: catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  }),

  updateOrder: catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("No Order Found", 404));
    }
    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order", 400)
      );
    }
    if (req.body.orderStatus === "Shipped") {
      order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
      });
    }

    order.orderStatus = req.body.orderStatus;

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  }),

  deleteOrder: catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("No Order Found", 404));
    }
    await order.remove();
    res.status(200).json({
      success: true,
    });
  }),
};

module.exports = orderController;
