const express = require("express");
const router = express.Router();

const { postSignup, postLogin } = require("../controllers/auth.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");

const {
  userSignupValidationSchema,
  userLoginValidationSchema,
} = require("../validators/user.validators");

const userSignupMiddleware = validateSchema(userSignupValidationSchema);
const userLoginMiddleware = validateSchema(userLoginValidationSchema);

router.post("/signup", userSignupMiddleware, postSignup);
router.post("/login", userLoginMiddleware, postLogin);
module.exports = router;
