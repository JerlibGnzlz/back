const express = require("express");
const controller = require("../controllers/order.controllers");

const router = express.Router();
module.exports = router;

router.get("/", controller.allOrders);

router.get("/:email", controller.getHistory);

// router.put("/:email",);

// router.post("/",);
