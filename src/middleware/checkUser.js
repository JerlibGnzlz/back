const { User } = require("../db");

const verifyUser = async (email) => {
  const userExist = await User.findOne({
    where: {
      email,
    },
  });

  if (userExist) {
    return "user exist", userExist;
  } else {
    return "user does not exist must be register";
  }
};

module.exports = verifyUser;
