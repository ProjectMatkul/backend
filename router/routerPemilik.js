const controller = require("../controller/controllerPemilik");
const { verifySignUp } = require("../middleware");

module.exports = function (app) {
  app.post(
    "/api/pemilik/addPengguna", 
    [verifySignUp.checkDuplicateUsername],
    controller.tambahPengguna
  );

  app.post("/api/pemilik/addRole", controller.tambahRole);

  app.get("/api/pemilik/viewUser", controller.getAllUser);

  app.get("/api/pemilik/viewRole", controller.getAllRole);

  app.post("/api/pemilik/deleteUser", controller.deleteUser);

  app.post("/api/pemilik/deleteRole", controller.deleteRole);

  app.put("/api/pemilik/editUser/:idpengguna", controller.editPengguna);

  app.put("/api/pemilik/editRole/:idrole", controller.editRole);

  app.get("/api/pemilik/roleDetails/:idrole", controller.getRoleDetails);

  app.get("/api/pemilik/userDetails/:idpengguna", controller.getUserDetails);
};
