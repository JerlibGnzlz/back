const express = require("express");
const controller = require("../controllers/modificateAdmin.controllers");

const router = express.Router();
module.exports = router;

router.put("/:id", controller.modificateAdminUser);
