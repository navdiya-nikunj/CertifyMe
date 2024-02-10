const Template = require("../models/template");

class TemplateService {
  createTemplate = async (data) => {
    try {
      const template = new Template(data);
      const savedTemplate = await template.save();
      console.log(savedTemplate);
      return { savedTemplate };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };
}
module.exports = TemplateService;
