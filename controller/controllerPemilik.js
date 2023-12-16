const db = require("../model");
const Pengguna = db.pengguna;
const Role = db.role;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

exports.tambahPengguna = async (req, res) => {
  const today = new Date();
  const tanggal = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  const total = await Pengguna.count();
  const incId = (total + 1).toString().padStart(2, "0");

  try {
    let pengguna = await Pengguna.create({
      idpengguna: req.body.idpengguna + tanggal + "B" + incId,
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

exports.tambahRole = async (req, res) => {
  const total = await Role.count();
  const incId = (total + 1).toString().padStart(2, "0");

  try {
    let role = await Role.create({
      idrole: incId,
      role: req.body.role,
      status: "Aktif",
    });

    const result = await role.save();
    console.log(role);
    if (result) {
      res.status(200).send({
        message: "Role berhasil ditambahkan",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
