const ErrorService = require("../services/errorService");
const UserService = require("../services/userService");
const errorService = new ErrorService();

const postLogout = async (req, res) => {
  try {
    if (req.user.instituteName) {
      res.clearCookie("institute-token");
    } else {
      res.clearCookie("student-token");
    }
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postLogout };
