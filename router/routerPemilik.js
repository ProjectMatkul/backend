const controller = require("../controller/controllerPemilik");
const { diskStorage } = require("../config/storage");
const uploadController = require("../controller/uploadRouter");
const { verifySignUp } = require("../middleware");
const multer = require("multer");

module.exports = function (app) {
  app.post("/api/pemilik/addPengguna", [verifySignUp.checkDuplicateUsername], controller.tambahPengguna);

  app.post("/api/pemilik/addRole", controller.tambahRole);

  app.get("/api/pemilik/viewUser", controller.getAllUser);

  app.get("/api/pemilik/viewRole", controller.getAllRole);

  app.post("/api/pemilik/deleteUser", controller.deleteUser);

  app.post("/api/pemilik/deleteRole", controller.deleteRole);

  app.put("/api/pemilik/editUser/:idpengguna", controller.editPengguna);

  app.put("/api/pemilik/editRole/:idrole", controller.editRole);

  app.get("/api/pemilik/roleDetails/:idrole", controller.getRoleDetails);

  app.get("/api/pemilik/userDetails/:idpengguna", controller.getUserDetails);

  app.get("/api/pemilik/getProfile/:idpengguna", controller.getProfile);

  app.post("/api/pemilik/upload", multer({ storage: diskStorage }).single("file"), uploadController.upload);
};
