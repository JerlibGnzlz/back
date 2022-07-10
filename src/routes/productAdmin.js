const express = require("express");
const controller = require("../controllers/getProductAdmin");

const router = express.Router();
module.exports = router;

router.get("/", controller.productAdmin);
