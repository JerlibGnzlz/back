const { User, UserAddress } = require("../db");
const { Op } = require("sequelize");
const checkUser = require("../middleware/checkUser");
const verify = require("./verifyUser");
const controller = {};

controller.getAllUsers = async (req, res) => {
  const { name, email } = req.query;
  //const {  } = req.params;
  // const check = await checkUser(emailLogged);
  // console.log(check);
  // if (check.isAdmin) {
  const checkUserA = await checkUser(email);

  if (name) {
    try {
      if (checkUserA.isAdmin) {
        let users = await User.findAll({
          where: {
            names: {
              [Op.substring]: name,
            },
          },
        });
        console.log(users);
        return res.status(200).send(users);
      } else {
        res.status(400).send("must be an admin to get user");
      }
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    try {
      if (checkUserA.isAdmin) {
        res.status(200).send(await User.findAll({include: [{ model: UserAddress }] }));
      } else {
        res.status(400).send("must be an admin to get user");
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

controller.getUserById = async (req, res) => {
  const { id } = req.params;
  //const { email } = req.query;

  //const checkUserA = await checkUser(email);

  if (id) {
    try {
      // if (checkUserA.isAdmin) {
      return res.status(200).send(
        await User.findAll({
          where: {
            id: id,
          },
        })
      );
      // } else {
      //   res.status(400).send("must be an admin to get this user");
      // }
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

controller.updateUser = async (req, res) => {
  const { id } = req.params;
  const { enabled, isAdmin } = req.body;

  try {
    User.update(
      { enabled, isAdmin },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("Usuario editado");
  } catch (err) {
    res.status(400).send(err);
  }
};

controller.createUser = async (req, res) => {
  const {
    email,
    names,
    lastNames,
    phone,
    birthDate,
    isAdmin,
    enabled,
    genre,
    image,
  } = req.body;

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
        genre,
        image:
          genre === "male"
            ? "https://us.123rf.com/450wm/artemstepanov/artemstepanov1606/artemstepanov160601036/57880370-cara-del-avatar-masculino-vector-plantilla-pictograma-bot%C3%B3n-ronda-icono-de-moda-plana-con-el-hombre-.jpg"
            : genre === "female"
            ? "https://e7.pngegg.com/pngimages/193/660/png-clipart-computer-icons-woman-avatar-avatar-girl-black-hair-logo.png"
            : "https://st3.depositphotos.com/11742109/36001/v/1600/depositphotos_360013274-stock-illustration-anonymous-gender-neutral-face-avatar.jpg",
        isAdmin: false,
        enabled: true,
      });
      res.status(200).send("user created");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

controller.enabledUserAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const doesExist = await User.findOne({
      where: { [Op.and]: { id: id, enabled: true } },
    });

    if (doesExist) {
      User.update({ enabled: false }, { where: { id } });
      res.status(200).send("user disabled");
    } else {
      User.update({ enabled: true }, { where: { id } });
      res.status(200).send("user enabled");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = controller;
