const express = require("express");
const controller = require("../controllers/commentUsers.controllers");

const router = express.Router();

router.get("/", controller.getComments);

module.exports = router;
