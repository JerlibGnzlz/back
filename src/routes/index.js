const { Router } = require("express");
const users = require("./users");
const product = require("./product");
const category = require("./category");
const brand = require("./brand");
const orderItem = require("./orderItem");
const mercadopago = require("./mercadoPago");
const auth = require("./auth");
const verifyUser = require("./verifyUser");
const chards = require("./chards")
const userAddress = require("./userAddress");
const userProfile = require("./userProfile");

const modificateAdmin = require("./userAdminMod");

const order = require("./order");
const favorites = require("./favorites");

const commentUsers = require("./commentUsers");
const productAdmin = require("./productAdmin");

//const softMiddleware = require("../middleware/integrationSoft");
//const middleware = require("../middleware");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/favorites", favorites);
router.use("/order", order);
router.use("/mp", mercadopago);
router.use("/users", users);
router.use("/product", product);
router.use("/categories", category);
router.use("/brands", brand);
router.use("/orderItem", orderItem);
router.use("/auth", auth);
router.use("/verify", verifyUser);
router.use("/chards", chards)
router.use("/userAddress", userAddress);
router.use("/profile", userProfile);
router.use("/adminMod", modificateAdmin);

router.use("/comments", commentUsers);
router.use("/productAdmin", productAdmin);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
