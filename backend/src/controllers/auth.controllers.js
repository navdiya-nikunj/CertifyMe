const AuthService = require("../services/authService");
const ErrorService = require("../services/errorService");
const authService = new AuthService();
const errorService = new ErrorService();

const postSignup = async (req, res) => {
  const result = await authService.signup(req.body);

  if (result.error) {
    const error = errorService.handleError(result.error);
    console.log(error);
    res.status(error.status).send(error.message);
  }

  if (result.jwt) {
    if (req.body.instituteName) {
      res.cookie("institute-token", result.jwt, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

    } else {
      res.cookie("student-token", result.jwt, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
    res.status(200).send(result.savedUser);
  }
};

const postLogin = async (req, res) => {
  const result = await authService.login(req.body);

  if (result.isLoggedIn) {
    if (req.body.isInstitute) {
      res.cookie("institute-token", result.jwt, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    } else {
      res.cookie("student-token", result.jwt, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
    res.status(200).send(result.user);
  } else {
    res.status(401).send("Invalid username or password!");
  }
};

module.exports = {
  postSignup,
  postLogin,
};
