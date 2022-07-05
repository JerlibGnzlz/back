const express = require("express");
const controller = require("../controllers/brand.controllers");

const router = express.Router();
module.exports = router;

router.get("/", controller.brand);
