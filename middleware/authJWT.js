const db = require("../model");
const Pengguna = db.pengguna;
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

verifyToken = async (req, res, next) => {
  // let token = req.session.token
  console.log(req.headers, "ini cookie");

  const bearerToken = req.headers["authorization"];

  if (!bearerToken) {
    return res.status(403).send({ message: "No Token Provided!" });
  }

  if (bearerToken !== undefined) {
    const bearer = bearerToken.split(" ");
    const token = bearer[1];
    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.session.idpengguna = decoded.idpengguna;

      next();
    });
  }
};

isPemilik = async (req, res, next) => {
  try {
    const pengguna = await Pengguna.findOne({
      where: {
        idpengguna: req.session.idpengguna,
      },
    });

    if (pengguna.idrole != 1) {
      return res.status(403).send({ message: "Require Pemilik Role" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const authJwt = { verifyToken: verifyToken, isPemilik: isPemilik };
module.exports = authJwt;
