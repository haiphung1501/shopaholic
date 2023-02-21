const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/order/new",
  authController.isAuthenticatedUser,
  orderController.newOrder
);

router.get(
  "/order/me",
  authController.isAuthenticatedUser,
  orderController.myOrders
);

router.get(
  "/admin/orders",
  authController.isAuthenticatedUser,
  authController.authorizeRoles("admin"),
  orderController.getAllOrders
);

router.get(
  "/order/:id",
  authController.isAuthenticatedUser,
  orderController.getSingleOrder
);
router.put(
  "/admin/order/:id",
  authController.isAuthenticatedUser,
  authController.authorizeRoles("admin"),
  orderController.updateOrder
);

router.delete(
  "/admin/order/:id",
  authController.isAuthenticatedUser,
  authController.authorizeRoles("admin"),
  orderController.deleteOrder
);

module.exports = router;
