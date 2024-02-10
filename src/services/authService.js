const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserService = require("../services/userService");
const userService = new UserService();

class AuthService {
  secret = process.env.JWT_SECRET_KEY;

  signup = async (data) => {
    const hashedPassword = await this.hashPassword(data.password);
    const { savedUser, error } = await userService.register({
      ...data,
      password: hashedPassword,
    });
    if (error) return { isSignedUp: false, error };

    const token = this.generateToken(savedUser._id, savedUser.instituteName);
    if (token) {
      return { isSignedUp: true, jwt: token, savedUser };
    }
    return { isSignedUp: true };
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  login = async (data) => {
    const { password, email, isInstitute } = data;
    const { user } = await userService.findEmail(email, isInstitute);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return { isLoggedIn: false };

      const token = this.generateToken(user._id, user.instituteName);
      if (token) {
        return { isLoggedIn: true, jwt: token, user };
      }
    }
    return { isLoggedIn: false };
  };

  generateToken = (userId, instituteName) => {
    try {
      const payload = { userId };
      if (instituteName) payload.instituteName = instituteName;

      const options = { expiresIn: "30d" };
      const token = jwt.sign(payload, this.secret, options);
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

module.exports = AuthService;
