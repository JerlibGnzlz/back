const express = require("express");
const controller = require("../controllers/category.controllers");

const router = express.Router();
module.exports = router;

router.get("/", controller.category);
