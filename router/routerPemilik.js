const controller = require("../controller/controllerPemilik");

module.exports = function (app) {
  app.post("/api/pemilik/addPengguna", controller.tambahPengguna);

  app.post("/api/pemilik/addRole", controller.tambahRole);

  app.get("/api/pemilik/viewUser", controller.getAllUser);

  app.get("/api/pemilik/viewRole", controller.getAllRole);

  app.post("/api/pemilik/deleteUser", controller.deleteUser);

  app.post("/api/pemilik/deleteRole", controller.deleteRole);

  app.post("/api/pemilik/editUser", controller.editPengguna);

  app.post("/api/pemilik/editRole", controller.editRole);

  app.get("/api/pemilik/roleDetails/:idrole", controller.getRoleDetails);

  app.get("/api/pemilik/userDetails/:idpengguna", controller.getUserDetails);
};
