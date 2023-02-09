const User = require("../models/user")

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
}

module.exports = userController;