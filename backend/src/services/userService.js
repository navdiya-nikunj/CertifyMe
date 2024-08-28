const Student = require("../models/student");
const Institute = require("../models/institute");

class UserService {
  register = async (data) => {
    let user = null;
    if (data.instituteName) {
      user = new Institute(data);
    } else {
      user = new Student(data);
    }
    try {
      const savedUser = await user.save();
      return { savedUser };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };

  findEmail = async (email, isInstitute) => {
    let user = null;
    try {
      if (isInstitute)
        user = await Institute.findOne({ email }).populate("templateIds");
      else user = await Student.findOne({ email });

      return { user };
    } catch (error) {
      console.log(error);
      // return { error };
    }
  };

  findById = async (userId, instituteName) => {
    let user = null;
    try {
      if (instituteName)
        user = await Institute.findOne({ _id: userId }).populate("templateIds");
      else user = await Student.findOne({ _id: userId });
      return user;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
