const UserService = require("../services/userService");
const userService = new UserService();
const JWTStrategy = require("passport-jwt").Strategy;
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

const getTokenFromCookie = (req) => {
  let token = null;
  console.log("ye le cookie", req.cookies);
  if (req?.cookies) {
    token = req.cookies["student-token"] || req.cookies["institute-token"];
  }
  console.log("token", token);
  return token;
};

const options = {
  jwtFromRequest: getTokenFromCookie,
  secretOrKey: secretKey,
};
const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    console.log("opps payload", payload);
    const user = await userService.findById(
      payload.userId,
      payload.instituteName
    );
    return done(null, user);
  } catch (error) {
    console.log(error);
    return done(error, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
