const express = require("express");
const controller = require("../controllers/users.controllers");

const router = express.Router();
module.exports = router;

router.get("/", controller.getAllUsers);

router.get("/:id", controller.getUserById);

//router.put("/:id", controller.updateUser);

router.post("/", controller.createUser);

router.put("/:id", controller.enabledUserAdmin);
