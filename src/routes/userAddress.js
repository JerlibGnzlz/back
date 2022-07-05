const express = require("express");
const controller = require("../controllers/userAddress.controllers");

const router = express.Router();
module.exports = router;

router.post("/", controller.createUserAddress);
