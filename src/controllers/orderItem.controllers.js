const e = require("express");
const { Op } = require("sequelize");
const { OrderItem, Brand, Category, Product } = require("../db");

//const {Op} = require('sequelize')
const controller = {};

controller.orderItem = async (req, res) => {
  let { util } = req.query;

  const allOrderItem = await OrderItem.findAll({
    include: [{ model: Product }],
  });

  let array = [];

  for (let i = 0; i < allOrderItem.length; i++) {
    let doesExist = array.filter((p) => p.id === allOrderItem[i].productId);
    if (doesExist[0]) {
      var result = array.map((el) =>
        el.id === doesExist[0].id
          ? { ...el, quantity: el.quantity + allOrderItem[i].quantity }
          : el
      );
      array = result;
    } else {
      array.push({
        id: allOrderItem[i].productId,
        quantity: allOrderItem[i].quantity,
      });
    }
  }

  array.sort(function (a, b) {
    if (a.quantity < b.quantity) {
      return 1;
    }
    if (a.quantity > b.quantity) {
      return -1;
    }
    return 0;
  });

  if (array.length < 5) {
    for (let i = 5; i > array.length; i = 5) {
      array.push({ id: -1 });
    }
  } else {
    array = array.slice(0, 5);
  }

  const product = await Product.findAll({
    where: {
      id: [array[0].id, array[1].id, array[2].id, array[3].id, array[4].id],
    },
    include: [{ model: Brand }, { model: Category }],
  });
  console.log(product);
  if (!util) {
    try {
      res.status(200).send(product);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    if (util === "orderItem") {
      try {
        res.status(200).send(allOrderItem);
      } catch (err) {
        res.status(404).send(err);
      }
    }
  }

  // const allOrderItem1 = await OrderItem.findAll({
  //   where: {
  //     [Op.and]: {
  //       quantity: { [Op.gt]: 1 },
  //     },
  //   },
  // });
  // const allOrderItem = await OrderItem.findAll({
  //   //include: [{ model: Product }],
  // });

  // const orderItems = allOrderItem.map((el) => {
  //   return {
  //     quantity: el.quantity,
  //     productId: el.productId,
  //   };
  // });

  // const idSell = orderItems.map((el) => el.productId);

  // console.log(idSell);

  // const idCant = orderItems.map((el) => el.quantity);

  // console.log(idCant);

  // const products = idSell.map((el) =>
  //   Product.findAll({
  //     where: {
  //       id: el,
  //     },
  //   })
  // );

  // console.log(products, "aaa");

  //const productTotal = await products.map((el) => el);

  //   const products1 = await Product.findAll({
  //     where: {
  //       id: 1,
  //     },
  //   });

  // if (!util) {
  //   try {
  //     res.status(200).send(allOrderItem1);
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
  // }
};
//controller.orderItem();
module.exports = controller;
