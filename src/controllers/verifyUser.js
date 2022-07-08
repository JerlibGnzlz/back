const { User } = require("../db");

const verifyUser = async (req, res) => {
  const { email } = req.query;

  const userExist = await User.findOne({
    where: {
      email,
    },
  });

  if (userExist) {
    // const emailfound = userExist.map((e) => e.id);
    res.status(200).send(userExist);
  } else {
    res.status(400).send("must be register");
  }
};

module.exports = verifyUser;
