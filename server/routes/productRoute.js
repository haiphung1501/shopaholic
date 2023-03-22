const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../middlewares/auth");

const router = express.Router();

router.get("/category", productController.getAllCategory);

router.get(
  "/admin/products",
  authController.isAuthenticatedUser,
  authController.authorizeRoles("admin"),
  productController.adminGetAllProduct
);

router.get("/", productController.getAllProduct);

router.post(
  "/",
  authController.isAuthenticatedUser,
  authController.authorizeRoles("admin"),
  productController.createProduct
);

router.put(
  "/review",
  authController.isAuthenticatedUser,
  productController.createReview
);

router.delete(
  "/review",
  authController.isAuthenticatedUser,
  productController.deleteReview
);

router.get("/reviews", productController.getProductReviews);

router.put(
  "/:id",
  authController.isAuthenticatedUser,
  productController.updateProduct
);

router.delete(
  "/:id",
  authController.isAuthenticatedUser,
  productController.deleteProduct
);

router.get("/:id", productController.getProduct);

module.exports = router;
