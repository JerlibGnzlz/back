const e = require("express");
const { Op } = require("sequelize");
const { OrderItem, Brand, Category, Product, Order, User} = require("../db");

//const {Op} = require('sequelize')
const controller = {};

controller.getFavorites = async (req, res) => {
    let{email} = req.params 
    try{
    if(email){
        res.status(200).send(await User.findOne({
                                    where: {email: email},
                                    includes: [{model: Product,
                                                includes: [{ model: Brand }, { model: Category }]}]
        }))
    }
    else{
        res.status(404).send({error: true, msg: "User not loggedt"})
    }
    }
    catch(err){
        res.status(400).send(err)
    }
}

controller.addFavorites = async(req, res) => {
    let{email, id} = req.query
    try{
        if(email){
            let user = await User.findOne({where: {email: email}})
            console.log(user)
            let favorites = await user.addProduct(id, { through: "favorites" })
            console.log(favorites)
            res.status(200).send("added to favorites")
        }
        else{
            res.status(404).send({error: true, msg: "User not loggedt"})
        }
    }
    catch(err){
        res.status(400).send(err)
    }
}

module.exports = controller