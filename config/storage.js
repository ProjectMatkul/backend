const multer = require("multer");
const path = require("path");

exports.getDate = Date.now();

// Buat folder untuk menyimpan file
exports.uploadDir = path.join(__dirname, "../uploads");

// Buat konfigurasi diskStorage multer
exports.diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, this.getDate + "-" + file.originalname);
  },
});
