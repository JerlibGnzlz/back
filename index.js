const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// const express = require("express");
// const path = require("path");

// const {saveCountries}=require("./src/util/countryCreate")
// const {saveProducts}=require("./src/util/paymentTypeCreate")
const { superData } = require("./src/util/superDataCreate");

// server.use(express.static(path.join(__dirname, "public")));

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    superData();
  });
});
