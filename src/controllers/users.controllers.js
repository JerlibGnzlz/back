const { User } = require("../db");
const { Op } = require("sequelize");
const controller = {};

controller.getAllUsers = async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      let users = await User.findAll({
        where: {
          names: {
            [Op.substring]: name,
          },
        },
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    try {
      res.status(200).send(await User.findAll());
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

controller.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send(
      await User.findAll({
        where: {
          id: id,
        },
      })
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

controller.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    User.update(user, {
      where: {
        id,
      },
    });
    res.status(200).send("Usuario editado");
  } catch (err) {
    res.status(400).send(err);
  }
};

controller.createUser = async (req, res) => {
  const { email, names, lastNames, phone, birthDate, isAdmin, enabled } =
    req.body;

  try {
    const userExist = await User.findOne({
      where: {
        email,
      },
    });

    if (userExist) {
      res.status(200).send("email exist");
    } else {
      await User.create({
        email,
        names,
        lastNames,
        phone,
        birthDate,
        isAdmin: false,
        enabled: true,
      });
      res.status(200).send("user created");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = controller;
