require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs")

const User = require("../models/user");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const { SECRET_KEY } = process.env;

const avatarsDir = path.resolve("public", "avatars")

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email already in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email)

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
}

const signin = async (req, res) => {
    
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    };

    const { _id: id, subscription} = user;

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(id, {token})


    res.status(200).json({ 
        token,
  user: {
    email: user.email,
    subscription,
  }
     });
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({
        message: "No content"
    })
}

const updateSubscription = async (req, res) => {
    const { _id: id } = req.user;
    const { subscription } = req.body;

        if (!['starter', 'pro', 'business'].includes(subscription)) {
        throw HttpError(400, "Invalid subscription value");
    }
    
    await User.findByIdAndUpdate(id, { subscription });

    res.json({
        message: "Subscription updated successfully"
    });
};

const updateAvatar = async (req, res) => {
    const {_id} = req.user
    const { path: oldPath, originalname } = req.file;
    const filename = `${_id}_${originalname}`
    const newPath = path.join(avatarsDir, filename)

    const image = await Jimp.read(oldPath);
    image.resize(250, 250);
    await image.writeAsync(newPath);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    await fs.unlink(oldPath);

    res.json({
        avatarURL,
    })
}


module.exports = {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar)
}