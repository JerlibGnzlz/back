const { Product, User, Coments } = require("../db");
const { Op } = require("sequelize");

const controller = {};

controller.getComments = async (req, res) => {
  const { id } = req.query;
  console.log(id, "aaa");
  if (id) {
    try {
      const searchComments = await Coments.findAll({
        where: { productId: id },
        include: [
          {
            model: Product,
          },
          {
            model: User,
          },
        ],
      });
      return res.status(200).send(searchComments);
    } catch (error) {
      res.status(400).send("there is not comment");
    }
  } else {
    try {
      res.status(200).send(
        await Coments.findAll({
          include: [
            {
              model: Product,
            },
            {
              model: User,
            },
          ],
        })
      );
    } catch (error) {
      res.send("error");
    }
  }
};
module.exports = controller;
