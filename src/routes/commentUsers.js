const express = require("express");
const controller = require("../controllers/commentUsers.controllers");

const router = express.Router();

router.get("/", controller.getComments);
router.get("/permison", controller.userPermison)
router.post("/register", controller.postComments);
router.delete("/delete/:id/:productId", controller.deleteComments);
router.put("/update", controller.updateComments);

module.exports = router;
