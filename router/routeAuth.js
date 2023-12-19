const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controller/controllerAuth");
const controllerPengguna = require("../controller/controllerPengguna");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
  app.post("/api/auth/login", controller.login);

  app.post("/api/auth/signup", [verifySignUp.checkDuplicateUsername], controller.signup);

  app.post("/api/auth/logout", verifyToken, controller.logout);

  app.post("/api/auth/masuk", controller.masukShift);

  app.get("/user", controllerPengguna.getPengguna);

  app.post("/register", controllerPengguna.register);
};
