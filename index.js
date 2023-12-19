const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieSession = require("cookie-session");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "warmindo-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

// Menyajikan file statis dari direktori 'uploads'
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// Menambahkan route yang telah Anda definisikan
require("./router/routeAuth")(app);
require("./router/routerPemilik")(app);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ` + port);
});
