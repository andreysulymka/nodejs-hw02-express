const express = require('express');

const authController = require("../../controllers/auth")

const { userRegisterSchema } = require("../../schemas/users");
const { userLoginSchema } = require("../../schemas/users");
const {userEmailSchema} = require("../../schemas/users");

const { validateBody } = require("../../decorators");

const { authenticate } = require("../../middlewares");

const {upload} = require("../../middlewares")

const router = express.Router();

router.post("/register", validateBody(userRegisterSchema), authController.signup)
router.get("/verify/:verificationToken", authController.verify)
router.post("/verify", validateBody(userEmailSchema), authController.resendVerify)
router.post("/login", validateBody(userLoginSchema), authController.signin)
router.get("/current", authenticate, authController.getCurrent)
router.post("/logout", authenticate, authController.logout)
router.patch("/subscription", authenticate, authController.updateSubscription)
router.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar)


module.exports = router;