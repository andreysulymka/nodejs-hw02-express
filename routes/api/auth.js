const express = require('express');

const authController = require("../../controllers/auth")

const {userRegisterSchema} = require("../../schemas/users");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.post("/signup", validateBody(userRegisterSchema), authController.signup)

module.exports = router;