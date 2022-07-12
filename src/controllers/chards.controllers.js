const { Order } = require("../db");
const { Op } = require("sequelize");
const controller = {};

controller.chardOrders = async (req, res) => {
    let orders = await Order.findAll()
    let approved = 0
    let rejected = 0
    let pending = 0
    console.log(orders[0])
    orders.forEach(e => {
        console.log(e.state)
        let state = e.state
        switch (state) {
            case "approved":{
                approved = approved + 1
                break
            }
            case "rejected":{
                rejected = rejected + 1
                break
            }
            case "pending":{
                pending = pending + 1
                break
            } }
        });

    let data = [
        {
            subject: "Approved",
            A: approved,
        },
        {
            subject: "Rejected",
            A: rejected,
        },
        {
            subject: "Pending",
            A: pending,
        },
    ]

    res.status(200).send(data)
}

controller.earningsPerOrder = async (req, res) => {
    let orders = await Order.findAll({where: {state: "approved"}})
    let data = [ 
        {
            subject: "Ordenes",
            total: 0
        }
    ]

    orders.forEach(e => {
        console.log(e.total)
        data.push({total: e.total})
    }) 

    res.status(200).send(data)
}

module.exports = controller;