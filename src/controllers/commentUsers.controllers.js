const { Product, User, Coments, Order, OrderItem } = require("../db");
const { Op } = require("sequelize");

const controller = {};

const getMedia = async (productId) => {
  const comments = await Coments.findAll({
    attributes: ["rating"],
    where: {
      [Op.and]: {
        productId,
        enabled: true,
      },
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
        where: { [Op.and]: {
                          productId: id,
                          enabled: true,
            }, },
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
  const { rating, review, productId, email } = req.body;
  if (!rating || !review || !productId || !email) {
    return res.status(400).json({ menssage: "All data are required" });
  }
  try {
    let user = await User.findOne({where: {email: email}})
    await Coments.create({
      rating,
      review,
      productId,
      userId : user.id
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
  const {id, productId} = req.params;
  console.log(id)
  try {
    await Coments.update(
      {
        enabled: false
      },
      {
      where: {
        id: id,
      }
      },
    );
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
    return res.status(200).json({ menssage: "Comment deleted" });
  } catch (error) {
    res.status(400).json({ menssage: "Bad required" });
  }
};

controller.updateComments = async (req, res) => {
  const { email, id, review, rating, productId } = req.body;
  if (!email || !id || !review || !rating || !productId) {
    return res.status(400).json({ menssage: "can't update comment" });
  }
  try {
    let user = await User.findOne({where: {email: email}})
    const update = await Coments.update(
      {
        review,
        rating
      },
      {
        where: {
          id,
          userId: user.id,
        },
      }
    );
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
    return res.status(200).json({ update });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

controller.userPermison = async (req, res) => {
  const { email, id} = req.query;
  try {
    const doesExist = await Coments.findAll({
      where: {[Op.and]: {
        productId: id,
        enabled: true,
        } },
      include: [
        {
          model: User,
          where: {email: email}
        },
      ],
    });
    if(doesExist[0]){
      return res.status(200).json(false)
    }
    else{
    let user = await User.findOne({
                              where: {email : email},
                              include:[{model: Order, 
                                  include:[{model: OrderItem,}]}]})
    let find = user.orders.some(o => o.orderItems.some(i => i.dataValues.productId === parseInt(id)))
    if(find){
    return res.status(200).json(true);}
    else{
      return res.status(200).json(false)
    }
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

module.exports = controller;
