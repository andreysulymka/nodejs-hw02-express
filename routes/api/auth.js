const express = require('express');

const authController = require("../../controllers/auth")

const { userRegisterSchema } = require("../../schemas/users");
const {userLoginSchema} = require("../../schemas/users");

const { validateBody } = require("../../decorators");

const {authenticate} = require("../../middlewares")

const router = express.Router();

router.post("/register", validateBody(userRegisterSchema), authController.signup)
router.post("/login", validateBody(userLoginSchema), authController.signin)
router.get("/current", authenticate, authController.getCurrent)
router.post("/logout", authenticate, authController.logout)
router.patch("/subscription", authenticate, authController.updateSubscription)


module.exports = router;