const db = require("../model");
const Pengguna = db.pengguna;
const AktivitasPengguna = db.aktivitas_pengguna;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

exports.register = async (req, res) => {
  const today = new Date();
  const tanggal = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  const total = await Pengguna.count();
  const incId = (total + 1).toString().padStart(2, "0");
  try {
    let pengguna = await Pengguna.create({
      idpengguna: req.body.idpengguna + tanggal + "X" + incId,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      namapengguna: req.body.namapengguna,
      idrole: req.body.idrole,
      status: "Aktif",
      foto: req.body.foto,
    });

    const result = await pengguna.save();
    console.log(pengguna);
    if (result) {
      res.status(200).send({
        message: "Pengguna berhasil ditambahkan",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getPengguna = async (req, res) => {
  try {
    const account = await Pengguna.findAll();

    res.status(200).send(account);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
