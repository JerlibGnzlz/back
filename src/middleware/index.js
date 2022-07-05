const admin = require("../config/firebase");

class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[0];

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.json({ message: "Unauthorized" });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new Middleware();
