const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieSession = require("cookie-session");
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

const port = 3000;

const now = new Date();
const localDate = new Date(now.getTime() + 7 * 60 * 60000);
const formattedDate = localDate.toISOString().slice(0, 10);
console.log(formattedDate);

require("./router/routeAuth")(app);
require("./router/routerPemilik")(app);

app.listen(3000, () => {
  console.log(`Server running on port ` + port);
});
