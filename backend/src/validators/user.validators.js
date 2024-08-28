const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const userSignupValidationSchema = Joi.object().keys({
  instituteName: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .max(50)
    .allow(""),
  email: Joi.string().email().required().max(35),
  password: JoiPassword.string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
});

const userLoginValidationSchema = Joi.object().keys({
  email: Joi.string().email().required().max(35),
  password: JoiPassword.string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
  isInstitute: Joi.boolean().required(),
});

module.exports = { userSignupValidationSchema, userLoginValidationSchema };
