const TemplateService = require("../services/templateService");
const ErrorService = require("../services/errorService");

const templateService = new TemplateService();
const errorService = new ErrorService();

const postTemplateNew = async (req, res) => {
  const institute = req.user;
  console.log(req.body);
  const result = await templateService.createTemplate({
    ...req.body,
    instituteName: institute.instituteName,
  });
  console.log(result);
  if (result.error) {
    const error = errorService.handleError(result.error);
    console.log(error);
    res.status(error.status).send(error.message);
  }
  institute.templateIds.push(result.savedTemplate._id);
  await institute.save();
  res.status(200).send(result.savedTemplate);
};

module.exports = { postTemplateNew };
