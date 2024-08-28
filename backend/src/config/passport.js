const UserService = require("../services/userService");
const userService = new UserService();
const JWTStrategy = require("passport-jwt").Strategy;
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

const getTokenFromCookie = (req) => {
  let token = null;
  if (req?.cookies) {
    token = req.cookies["student-token"] || req.cookies["institute-token"];
  }
  return token;
};

const options = {
  jwtFromRequest: getTokenFromCookie,
  secretOrKey: secretKey,
};
const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
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
