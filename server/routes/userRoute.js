const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../middlewares/auth");
const router = express.Router();

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.post("/logout", userController.logoutUser);

router.get(
  "/me",
  authController.isAuthenticatedUser,
  userController.getUserDetail
);

router.post(
  "/me/updatepassword",
  authController.isAuthenticatedUser,
  userController.updateUserPassword
);

router.post(
  "/me/update",
  authController.isAuthenticatedUser,
  userController.updateUserProfile
);

router.get(
  "/admin/users",
  authController.isAuthenticatedUser,
  authController.authorizeRoles("admin"),
  userController.getAllUser
);

router.get(
  "/admin/user/:id",
  authController.isAuthenticatedUser,
  authController.authorizeRoles("admin"),
  userController.getSingleUser
);

router.put(
  "/admin/user/:id",
  authController.isAuthenticatedUser,
  authController.authorizeRoles("admin"),
  userController.updateUserProfileAdmin
);

router.delete(
  "/admin/user/:id",
  authController.isAuthenticatedUser,
  authController.authorizeRoles("admin"),
  userController.deleteUser
);

module.exports = router;
