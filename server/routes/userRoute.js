const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post("/",userController.createUser);

router.get("/", userController.getAllUser);

router.post("/login", userController.loginUser);

router.post("/logout", userController.logoutUser);

module.exports = router