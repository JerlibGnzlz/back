const { Product, Brand, Category } = require("../db");
const { Op } = require("sequelize");
const Joi = require("joi");
//const { serialize } = require("pg-protocol");
const controller = {};

controller.product = async (req, res) => {
  let { category, brand, id, price, genre, search } = req.query;

  if (!search) {
    search = "";
  }

  // para que no se creen errores price sola mente puede tomar los valores ASC o DESC sino no se aplicara el ordenamiento
  let orderByPrice = [];
  if (price) {
    if (price === "ASC" || price === "DESC") {
      orderByPrice = [["price", price]];
    }
  }

  if (id) {
    try {
      res.status(200).send(
        await Product.findAll({
          where: {
            [Op.and]: {
              id: id,
              enabled: true,
            },
          },
          include: [{ model: Brand }, { model: Category }],
        })
      );
    } catch (err) {
      res.status(400).send(err);
    }
  } else if (genre) {
    if (category || brand) {
      if (category && brand) {
        try {
          res.status(200).send(
            await Product.findAll({
              where: {
                [Op.and]: {
                  name: { [Op.substring]: search },
                  genre: genre,
                  brandId: brand,
                  categoryId: category,
                  enabled: true,
                },
              },
              order: orderByPrice,
              include: [{ model: Brand }, { model: Category }],
            })
          );
        } catch (err) {
          res.status(400).send(err);
        }
      } else if (category) {
        try {
          res.status(200).send(
            await Product.findAll({
              where: {
                [Op.and]: {
                  name: { [Op.substring]: search },
                  genre: genre,
                  categoryId: category,
                  enabled: true,
                },
              },
              order: orderByPrice,
              include: [{ model: Brand }, { model: Category }],
            })
          );
        } catch (err) {
          res.status(400).send(err);
        }
      } else {
        try {
          res.status(200).send(
            await Product.findAll({
              where: {
                [Op.and]: {
                  name: { [Op.substring]: search },
                  genre: genre,
                  brandId: brand,
                  enabled: true,
                },
              },
              order: orderByPrice,
              include: [{ model: Brand }, { model: Category }],
            })
          );
        } catch (err) {
          res.status(400).send(err);
        }
      }
    } else {
      try {
        res.status(200).send(
          await Product.findAll({
            where: {
              [Op.and]: {
                name: { [Op.substring]: search },
                genre: genre,
                enabled: true,
              },
            },
            order: orderByPrice,
            include: [{ model: Brand }, { model: Category }],
          })
        );
      } catch (err) {
        res.status(400).send(err);
      }
    }
  } else if (category || brand) {
    if (category && brand) {
      try {
        res.status(200).send(
          await Product.findAll({
            where: {
              [Op.and]: {
                name: { [Op.substring]: search },
                brandId: brand,
                categoryId: category,
                enabled: true,
              },
            },
            order: orderByPrice,
            include: [{ model: Brand }, { model: Category }],
          })
        );
      } catch (err) {
        res.status(400).send(err);
      }
    } else if (category) {
      try {
        res.status(200).send(
          await Product.findAll({
            where: {
              [Op.and]: {
                name: { [Op.substring]: search },
                categoryId: category,
                enabled: true,
              },
            },
            order: orderByPrice,
            include: [{ model: Brand }, { model: Category }],
          })
        );
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      try {
        res.status(200).send(
          await Product.findAll({
            where: {
              [Op.and]: {
                name: { [Op.substring]: search },
                brandId: brand,
                enabled: true,
              },
            },
            order: orderByPrice,
            include: [{ model: Brand }, { model: Category }],
          })
        );
      } catch (err) {
        res.status(400).send(err);
      }
    }
  } else {
    try {
      res.status(200).send(
        await Product.findAll({
          where: {
            [Op.and]: { name: { [Op.iLike]: `%${search}%` }, enabled: true },
            // name: { [Op.iLike]: `%${search}%` },
            // enabled: true,
          },
          order: orderByPrice,
          include: [{ model: Brand }, { model: Category }],
        })
      );
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

const schema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  description: Joi.string().min(30).max(400).required(),
  model: Joi.string(),
  price: Joi.number().required(),
  image: Joi.array().items(Joi.string()).required(),
  brandId: Joi.number().required(),
  categoryId: Joi.number().required(),
  genre: Joi.string()
    .valid("men", "women", "kids", "accesories", "neutral")
    .insensitive(),
});

controller.createProduct = async (req, res) => {
  const { name, description, model, price, image, brandId, categoryId, genre } =
    req.body;

  try {
    await schema.validateAsync({
      name: name,
      description: description,
      model: model,
      price: price,
      image: image,
      brandId: brandId,
      categoryId: categoryId,
      genre: genre,
    });

    const doesExist = await Product.findOne({ where: { name: name } });

    if (doesExist) {
      res.status(400).send(`${name} ya existe un producto con ese nombre`);
    } else {
      await Product.create({
        genre: genre,
        name: name,
        description: description,
        model: model,
        price: price,
        image: image,
        brandId: brandId,
        categoryId: categoryId,
        rating: 0,
      });
      res.status(200).send("producto creado");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// controller.editPorduct = async (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     description,
//     model,
//     price,
//     image,
//     brandId,
//     categoryId,
//     genre,
//     enabled,
//   } = req.body;

//   try {
//     const product = await schema.validateAsync({
//       name: name,
//       description: description,
//       model: model,
//       price: price,
//       image: image,
//       brandId: brandId,
//       categoryId: categoryId,
//       genre: genre,
//       enabled,
//     });

//     Product.update(product, {
//       where: {
//         id,
//       },
//     });
//     res.status(200).send("producto editado");
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

controller.editPorduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, model, price, genre, stock } = req.body;

  try {
    Product.update(
      { name, description, model, price, genre, stock },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("product update");
  } catch (err) {
    res.status(400).send(err);
  }
};

controller.enabledProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const doesExist = await Product.findOne({
      where: { [Op.and]: { id: id, enabled: true } },
    });

    if (doesExist) {
      Product.update({ enabled: false }, { where: { id } });
      res.status(200).send("Producto desabilitado");
    } else {
      Product.update({ enabled: true }, { where: { id } });
      res.status(200).send("Producto habilitado");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = controller;
