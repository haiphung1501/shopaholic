const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/user");
const sendToken = require("../utils/jwtToken");

const userController = {
    getAllUser : async (req,res) => {
        try {
            const users = await User.find();
            res.status(200).send(users);
        } catch (err) {res.status(500).json(err)}

    },
    createUser : async (req,res) => {
        try {
            const {name, email, password} = req.body;

            const user = await User.create({
                name, email, password,
            })

            const token = user.getJWTToken();

            res.status(200).send(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    loginUser : async (req, res) => {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                return next();
            }

            const user = await User.findOne({email}).select("+password")

            if (!user) {
                return next();
            }

            const isPasswordMatched = await user.comparePassword(password)

            if (!isPasswordMatched) {
                res.status(401).json({success: false})
            } else {
                console.log("here")
                sendToken(user, 200, res);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    logoutUser: catchAsyncError(async (req,res,next) => {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })

        res.status(200).json({
            success:true,
            message: "Logged Out",
        })
    })
}

module.exports = userController;