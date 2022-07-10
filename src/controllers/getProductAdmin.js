const { Product } = require("../db");

const controller = {};

controller.productAdmin = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    try {
      res.status(200).send(await Product.findAll());
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(200).send(
      await Product.findOne({
        where: {
          name,
        },
      })
    );
  }
};

module.exports = controller;
