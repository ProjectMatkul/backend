// // import express from "express";
// // import router from "./router/router.js";
// const router = require('./router/router.js')
// const express = require('express')

// const db = require('./model/index.js');
// const bodyParser = require('body-parser');

// // db.sequelize.sync({force: true})


// const app = express();
// const port = 3000;

// // app.use(router)
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// require('./router/router.js')(app)

// app.listen(3000, () => {
//     console.log("app listen to port" + port)
// });


const router = require('./router/router.js')
const express = require('express')

const db = require('./model/index.js');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')




const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
    name: 'warmindo-session',
    keys: ['COOKIE_SECRET'],
    httpOnly: true
}))

app.listen(3000, () => {
    console.log("app listen to port" + port)
});

// db.sequelize.sync({force: true})

require('./router/router.js')(app)
