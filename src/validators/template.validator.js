const Joi = require("joi");

const templateValidationSchema = Joi.object().keys({
  title: Joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .min(15)
    .max(35)
    .required(),
  phrase: Joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .max(80)
    .required(),
  description: Joi.string()
    .regex(/^[a-zA-Z0-9\s]+$/)
    .min(30)
    .max(350)
    .required(),
  signature: {
    name: Joi.string()
      .regex(/^[a-zA-Z\s]+$/)
      .max(20)
      .required(),
    designation: Joi.string()
      .regex(/^[a-zA-Z\s]+$/)
      .max(45)
      .required(),
  },
});

module.exports = { templateValidationSchema };
