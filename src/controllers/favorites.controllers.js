const e = require("express");
const { Op } = require("sequelize");
const { OrderItem, Brand, Category, Product, Order, User} = require("../db");

//const {Op} = require('sequelize')
const controller = {};

controller.getFavorites = async (req, res) => {
    let{email} = req.params 
    try{
        let user = await User.findOne({where: {email: email}})
        res.status(200).send(await Product.findAll({where: {id: user.favorites}, include: [{ model: Brand }, { model: Category }]}))
        
    }
    catch(err){
        res.status(400).send(err)
    }
}

controller.addFavorite = async(req, res) => {
    let{email} = req.params
    let{id} = req.query
    try{
        let user = await User.findOne({where: {email: email}})
        if(!user.favorites.includes(id)){
            await User.update({favorites: [...user.favorites, id]}, {where: {id: user.id}})
            res.status(200).send("added to favorites")
        }
        else{
            res.status(404).send({error: true, msg: "that favorite already exists"})
        }
    }
    catch(err){
        res.status(400).send(err)
    }
}

controller.deleteFavorite = async(req, res) => {
    let{email} = req.params
    let{id} = req.query
    try{
        let user = await User.findOne({where: {email: email}})
        if(user.favorites.includes(id)){
            let newFavorites = user.favorites.filter(f => f !== id)
            await User.update({favorites: newFavorites}, {where: {id: user.id}})
            res.status(200).send("was removed from favorites")
        }
        else{
            res.status(404).send({error: true, msg: "that favorite does not exist"})
        }
    }
    catch(err){
        res.status(400).send(err)
    }

}

module.exports = controller