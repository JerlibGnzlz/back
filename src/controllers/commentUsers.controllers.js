const { Product, User, Coments } = require("../db");
const { Op } = require("sequelize");

const controller = {};

const getMedia = async (productId) => {
  const comments = await Coments.findAll({
    attributes: ["rating"],
    where: {
      productId,
    },
  });
  const promedio = comments.reduce((acc, currentValue) => {
    acc += currentValue.rating;
    return acc;
  }, (acc = 0));
  console.log(promedio);
  return Math.floor(promedio / comments.length);
};

controller.getComments = async (req, res) => {
  const { id } = req.query;

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

controller.postComments = async (req, res) => {
  const { rating, review, productId, userId } = req.body;
  if (!rating || !review || !productId || !userId) {
    return res.status(400).json({ menssage: "All data are required" });
  }
  try {
    await Coments.create({
      rating,
      review,
      productId,
      userId,
    });
    const promedio = await getMedia(productId);
    await Product.update(
      {
        rating: promedio,
      },
      {
        where: {
          id: productId,
        },
      }
    );
    return res.status(201).json({ message: "successful dating" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

controller.deleteComments = async (req, res) => {
  const { idUser, idComment } = req.params;
  try {
    await Coments.destroy({
      where: {
        userId: idUser,
        id: idComment,
      },
    });

    return res.status(200).json({ menssage: "Comment deleted" });
  } catch (error) {
    res.status(400).json({ menssage: "Bad required" });
  }
};

controller.updateComments = async (req, res) => {
  const { idUser, id, review } = req.body;
  if (!idUser || !id || !review) {
    return res.status(400).json({ menssage: "can't update comment" });
  }
  try {
    const update = await Coments.update(
      {
        review,
      },
      {
        where: {
          id,
          userId: idUser,
        },
      }
    );
    return res.status(200).json({ update });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = controller;
