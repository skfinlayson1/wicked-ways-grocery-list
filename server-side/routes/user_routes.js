const express = require("express");
const router = express.Router();

const authController = require("../controller/user_controller");
const validation = require("./validations");

router.get("/user/check", authController.checkStatus);
router.get("/user/logout", authController.signOut);

router.post("/user/sign-up", validation.createNewUserValidations, validation.validator, authController.signUp);
router.post("/user/sign-in", validation.signInUserValidations, validation.validator, authController.signIn);

module.exports = router;