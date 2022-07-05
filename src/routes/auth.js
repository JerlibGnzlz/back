const express = require("express");
const controller = require("../controllers/auth.controllers");

const router = express.Router();
module.exports = router;

router.post("/", controller.auth);
