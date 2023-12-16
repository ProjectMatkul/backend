const controller = require("../controller/controllerPemilik");

module.exports = function (app) {
  app.post("/api/pemilik/addPengguna", controller.tambahPengguna);

  app.post("/api/pemilik/addRole", controller.tambahRole);
};
