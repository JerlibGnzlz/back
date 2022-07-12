const express = require("express");
const controller = require("../controllers/chards.controllers");

const router = express.Router();

router.get("/orders", controller.chardOrders);
router.get("/earnings", controller.earningsPerOrder)

module.exports = router;
