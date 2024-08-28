const ErrorService = require("../services/errorService");
const errorService = new ErrorService();

const validateSchema = (schema) => {
  return function (req, res, next) {
    const { error: joiError } = schema.validate(req.body);
    if (joiError) {
      const error = errorService.handleJoiError(joiError);
      console.log(error);
      res.status(error.status).send(error.message);
    } else next();
  };
};

module.exports = { validateSchema };
