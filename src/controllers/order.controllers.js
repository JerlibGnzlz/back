const e = require("express");
const { Op } = require("sequelize");
const { OrderItem, Brand, Category, Product, Order, User } = require("../db");

//const {Op} = require('sequelize')
const controller = {};


controller.allOrders = async (req, res) => {
    let {email} = req.query;
    let user = await User.findAll({where: {email: email}})
    try{
    if(user[0].dataValues.isAdmin){
        res.status(200).send(await Order.findAll({
            include: [
                    { model: User }, 
                    { model: OrderItem,
                      include:[{
                            model: Product,
                            include: [{model: Brand}]}]
                    }],
        }))
    }
    else{
        res.status(404).send({error: true, msg: "Not an admin user"})
    }
    }
    catch(err){
        res.status(400).send(err)
    }
}

controller.getHistory = async (req, res) => {
    let{email} = req.params; 
    if(email){
    try{
        res.status(200).send(await User.findOne({
                                where: {email : email},
                                include:[{
                                        model: Order, 
                                        include:[{
                                            model: OrderItem,
                                            include: [{ 
                                                    model: Product,
                                                    include: [{model: Brand}]}]}]}]
        }))
    }catch(err){
        res.status(400).send(err)
    }
    }
    else{
        res.status(404).send({error: true, msg: "User not loggedt"})
    }
}

controller.generateOrder = async (req, res) => {
    let{status, payment_id, payment_type} = req.query
    let{product, user} = req.body
    let doesExist = await Order.findAll({where: {id: payment_id}})
    let doesUserExist = await User.findOne({where: {email: user}})
    let current = undefined
    if(!product){
        console.log("no hay productos")
        res.status(404).send({error: true, msg: "Not product in car"})
    }
    else if(doesExist[0]){
        console.log("orden existente", doesExist)
        res.status(404).send({error: true, msg: "That order id exist"})
    }
    else if(status === "rejected"){
        console.log("status rejected")
        res.status(404).send({error: true, msg: "The order is rejected"})
    }
    else if(doesUserExist){
        let total = 0
        for(let i = 0; i < product.length; i++){
            total = total + (parseFloat(product[i].price) * product[i].quantity)
            current = await Product.findOne({where:{id:product[i].id}})
            await Product.update({stock: current.stock - product[i].quantity}, {where: {id: product[i].id}})
        }
        let date = new Date()
        date = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`
        let order = await Order.create({id:payment_id, state:status, total:total, userId:doesUserExist.id, date:date, payment_type: payment_type})
        await req.body.product.map(async p => {
                await OrderItem.create({orderId: order.id, productId: p.id, quantity: p.quantity})
        })
        res.status(200).send("okey")
    }
    else{
        res.status(404).send({error: true, msg: "User not loggedt"})
    }
}

module.exports = controller