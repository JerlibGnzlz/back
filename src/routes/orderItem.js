const express = require("express");
const controller = require("../controllers/orderItem.controllers");

const router = express.Router();
module.exports = router;

router.get("/", controller.orderItem);
// router.get("/", controller.orderItem);
