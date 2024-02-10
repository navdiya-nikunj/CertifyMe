const express = require("express");
const router = express.Router();

const { postTemplateNew } = require("../controllers/template.controllers");
const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  templateValidationSchema,
} = require("../validators/template.validator");

const templateMiddleware = validateSchema(templateValidationSchema);

router.post("/template/new", templateMiddleware, postTemplateNew);

module.exports = router;
