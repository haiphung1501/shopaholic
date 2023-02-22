const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const cloundinary = require("cloudinary");

const userController = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({
        name,
        email,
        password,
      });
      sendToken(user, 200, res);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next();
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next();
      }

      const isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched) {
        res.status(401).json({ success: false });
      } else {
        sendToken(user, 200, res);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  logoutUser: catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }),

  getUserDetail: catchAsyncError(async (req, res, next) => {
    console.log(req.user);
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  }),

  updateUserPassword: catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password doesn't match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  }),

  updateUserProfile: catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
      const image_id = user.avatar.public_id;

      await cloundinary.v2.uploader.destroy(image_id);

      const result = await cloundinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  }),

  //Admin
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSingleUser: catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("ID not found"));
    }

    res.status(200).json({
      success: true,
      user,
    });
  }),

  updateUserProfileAdmin: catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  }),

  deleteUser: catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User does not exist"));
    }

    await user.remove();

    res.status(200).json({
      success: true,
    });
  }),
};

module.exports = userController;
