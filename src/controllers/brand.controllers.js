const { Brand, Product } = require("../db");
const {Op} = require('sequelize');
const controller = {};

controller.brand = async (req, res) => {
  let { genre, category } = req.query;
  try{
    let allBrands = undefined
    let product = []
    if(category || genre){
      if(category && genre){
      product = await Product.findAll({
        where: {
          [Op.and]: {
              genre: genre,
              categoryId: category,
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
            categoryId: category
          }
        })
      }
    }
    else{
      allBrands = await Brand.findAll()
    }

    let arrayId = []
    product.forEach(p => {
      if (arrayId.includes(p.brandId)){
        return
      }
      else{
        arrayId.push(p.brandId)
      }
    })

    if(arrayId.length !== 0){
      res.status(200).send(await Brand.findAll({
        where: {
          id: arrayId
        }
      }));
    } 
    else if (allBrands){
      res.status(200).send(allBrands)
    }
    else{
      res.status(200).send("no hay marcas")
    }
  }
  catch(err){
    res.status(400).send(err)
  }
  
};

module.exports = controller;