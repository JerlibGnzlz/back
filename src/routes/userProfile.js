const express = require("express");
const controller = require("../controllers/userProfile.controller");

const router = express.Router();
module.exports = router;

router.get("/", controller.getUserProfile);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.enabledUser);
