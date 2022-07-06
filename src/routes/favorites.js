const express = require("express");
const controller = require("../controllers/favorites.controllers");

const router = express.Router();
module.exports = router;

router.post("/", controller.addFavorites);

router.get("/:email", controller.getFavorites);