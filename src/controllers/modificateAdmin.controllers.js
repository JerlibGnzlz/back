const { User } = require("../db");
const { Op } = require("sequelize");
const controller = {};

controller.modificateAdminUser = async (req, res) => {
  const { id } = req.params;

  try {
    const doesExist = await User.findOne({
      where: { [Op.and]: { id: id, isAdmin: true } },
    });

    if (doesExist) {
      User.update({ isAdmin: false }, { where: { id } });
      res.status(200).send("user not admin");
    } else {
      User.update({ isAdmin: true }, { where: { id } });
      res.status(200).send("user admin");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = controller;
