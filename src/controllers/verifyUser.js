const { User } = require("../db");

const verifyUser = async (req, res) => {
  const { email } = req.query;

  const userExist = await User.findOne({
    where: {
      email,
    },
  });

  if (userExist) {
    res.status(200).send("user exist");
  } else {
    res.status(400).send("must be register");
  }
};

module.exports = verifyUser;
