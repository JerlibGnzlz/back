const express = require("express");
const controller = require("../controllers/favorites.controllers");

const router = express.Router();
module.exports = router;

router.delete("/:email", controller.deleteFavorite)

router.post("/:email", controller.addFavorite);

router.get("/:email", controller.getFavorites);