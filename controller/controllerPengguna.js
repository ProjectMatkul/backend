const db = require("../model/index");
const Pengguna = db.pengguna


exports.register = async (req, res) => {
    try {
        const account = await Pengguna.create()
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getPengguna = async (req, res) => {
    try {
        const account = await Pengguna.findAll()

        res.status(200).send(account)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}