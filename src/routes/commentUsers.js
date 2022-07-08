const express = require("express");
const controller = require("../controllers/commentUsers.controllers");

const router = express.Router();
module.exports = router;

router.get("/", controller.getComments);
