const { User } = require("../db");
const { Op } = require("sequelize");
//const checkUser = require("../middleware/checkUser");
//const verify = require("./verifyUser");
const controller = {};

controller.getUserProfile = async (req, res) => {
  const { email } = req.query;

  if (email) {
    try {
      let users = await User.findOne({
        where: {
          email,
        },
      });
      return res.status(200).json({
        email: users.email,
        names: users.names,
        lastNames: users.lastNames,
        phone: users.phone,
        birthDate: users.birthDate,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    req.status(404).send("need a email to search this user");
  }
};

controller.updateUser = async (req, res) => {
  const { email } = req.params;
  const { names, lastNames, phone, birthDate } = req.body;

  try {
    User.update(
      { names, lastNames, phone, birthDate },
      {
        where: {
          email,
        },
      }
    );
    res.status(200).send("user update");
  } catch (err) {
    res.status(400).send(err);
  }
};

controller.enabledUser = async (req, res) => {
  const { email } = req.params;

  try {
    const doesExist = await User.findOne({
      where: { [Op.and]: { email, enabled: true } },
    });

    if (doesExist) {
      User.update({ enabled: false }, { where: { email } });
      res.status(200).send("user disabled");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = controller;
