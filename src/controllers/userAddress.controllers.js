const { UserAddress } = require("../db");
const controller = {};

controller.createUserAddress = async (req, res) => {
  const {
    postalCode,
    state,
    city,
    address,
    annotations,
    deleted,
    userId,
    countryId,
  } = req.body;

  try {
    // const addressExist = await UserAddress.findOne({
    //   where: {
    //     userId,
    //   },
    // });

    await UserAddress.create({
      postalCode,
      state,
      city,
      address,
      annotations,
      deleted: false,
      userId,
      countryId,
    });
    res.status(200).send("address created");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = controller;
