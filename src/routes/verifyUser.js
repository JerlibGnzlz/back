const express = require("express");
const verifyUSer = require("../controllers/verifyUser");

const router = express.Router();
module.exports = router;

router.get("/", verifyUSer);
