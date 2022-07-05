               
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// const {saveCountries}=require("./src/util/countryCreate")
// const {saveProducts}=require("./src/util/paymentTypeCreate")
const {superData}=require("./src/util/superDataCreate")

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    superData()
  });
});
