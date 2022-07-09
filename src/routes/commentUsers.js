const express = require("express");
const controller = require("../controllers/commentUsers.controllers");

const router = express.Router();

router.get("/", controller.getComments);
router.post("/register", controller.postComments);
router.delete("/delete/:idUser/:idComment", controller.deleteComments);
router.put("/update", controller.updateComments);

module.exports = router;
