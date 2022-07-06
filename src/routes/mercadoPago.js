const express = require("express");
const router = express.Router();
module.exports = router;
const controller = require("../controllers/order.controllers")

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

router.get("/", function(req, res, next){
    return res.json({
        "/payment": "generate a payment link",
    });
})

router.post("/payment", function(req, res, next) {
    PaymentInstance.getPaymentLink(req, res);
})

router.post("/process_payment", controller.generateOrder)

