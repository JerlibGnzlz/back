const controller = {};
const admin = require("../config/firebase");

controller.auth = async (req, res) => {
  const { token } = req.body;

  const decodeValue = await admin.auth().verifyIdToken(token);
};

module.exports = controller;
