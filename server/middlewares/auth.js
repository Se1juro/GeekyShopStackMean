const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
module.exports = {
  verifyToken: async function verificarToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ err: "Peticion no autorizada" });
      }
      const token = req.headers.authorization.split(" ")[1];
      if (token == "" || null) {
        return res.status(401).json({ err: "Peticion no autorizada" });
      }
      const payload = await jwt.verify(token, secretKey);
      if (!payload) {
        return res.status(401).json({ err: "Peticion no autorizada" });
      }
      req.userId = payload._id;
      next();
    } catch (e) {
      return res.status(401).send("Peticion no autorizada");
    }
  },
  verifyRole: async function verifyRoleAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = await jwt.verify(token, secretKey, function (
        err,
        decoded
      ) {
        if (decoded.rol != "admin") {
          return res.status(401).json({ err: "Peticion no autorizada" });
        } else {
          next();
        }
      });
    } catch (e) {
      return res.status(401).send("Peticion no autorizada");
    }
  },
};