const express = require("express");
const controller = require("../controllers/product.controllers");

const router = express.Router();
module.exports = router;

router.get("/", controller.product);
router.post("/", controller.createProduct);
router.put("/:id", controller.editPorduct);
router.delete("/:id", controller.enabledProduct);
