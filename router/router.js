// // const express = require('express')
// const controllerPengguna = require('../controller/controllerPengguna')

// // const router = express.Router();

// // router.get('/api/user', controllerPengguna.getPengguna)

// // module.exports =  router;

// module.exports = function(app) {
//     app.get(
//         '/api/user',
//         controllerPengguna.getPengguna
//     )
// }

const { verifySignUp } = require("../middleware")
const controller = require("../controller/contorllerAuth")

module.exports = function(app) {

    app.post(
        '/api/auth/login',
        controller.login
    )

    app.post(
        '/api/auth/signup',
        [
            verifySignUp.checkDuplicateUsername,
        ],
        controller.signup
    )

    app.post(
        '/api/auth/logout',
        controller.logout
    )

    app.post(
        '/api/auth/masuk',
        controller.inShift
    )

}