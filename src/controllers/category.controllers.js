const { Category, Product } = require("../db");
const {Op} = require('sequelize');
const controller = {};

controller.category = async (req, res) => {
  let { genre, brand } = req.query;
  try{
    let allCategories = undefined
    let product = []
    if(brand || genre){
      if (brand && genre){
      product = await Product.findAll({
        where: {
          [Op.and]: {
              genre: genre,
              brandId: brand,
          }
        },
      })}
      else if (genre){
        product = await Product.findAll({
          where:{
            genre:genre
          }
        })
      }
      else{
        product = await Product.findAll({
          where:{
            brandId: brand,
          }
        })
      }
      }
    else{
      allCategories = await Category.findAll()
    }

  
    let arrayId = []
    product.forEach(p => {
      if (arrayId.includes(p.categoryId)){
        return
      }
      else{
        arrayId.push(p.categoryId)
      }
    })
  
    if(arrayId.length !== 0){
      res.status(200).send(await Category.findAll({
        where: {
          id: arrayId
        }
      }));
    }
    else if(allCategories){
      res.status(200).send(allCategories)
    }
    else{
      res.status(200).send("no hay categorias")
    }
  }catch(err){
    res.status(400).send(err)
  }
};

module.exports = controller;