const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

require("./db.js");

const server = express();

server.name = "API";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      console.log("esta aca?");
      return cb(null, true);
    }

    cb("Error: El Archivo no es de tipo imagen");
  },
}).array("image", 3);

server.use(uploadImage);

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());

server.use("/", routes);

//static Files
server.use(express.static(path.join(__dirname, "public")));

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
