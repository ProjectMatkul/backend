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

exports.getAllUser = async (req, res) => {
  try {
    const account = await Pengguna.findAll();

    res.status(200).send(account);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllRole = async (req, res) => {
  try {
    const roles = await Role.findAll();

    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const idpengguna = req.body.idpengguna;

    const userToDelete = await Pengguna.findOne({ where: { idpengguna } });

    if (!userToDelete) {
      return res.status(404).send({ message: "Pengguna tidak ditemukan" });
    }

    await userToDelete.destroy();

    res.status(200).send({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const idrole = req.body.idrole;

    const roleToDelete = await Role.findOne({ where: { idrole } });

    if (!roleToDelete) {
      return res.status(404).send({ message: "Role tidak ditemukan" });
    }

    await roleToDelete.destroy();

    res.status(200).send({ message: "Role berhasil dihapus" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.editPengguna = async (req, res) => {
  try {
    const { idpengguna } = req.body; // Ambil ID pengguna dari body request

    const edit = await Pengguna.findOne({ where: { idpengguna } });

    if (!edit) {
      return res.status(404).send({ message: "Pengguna tidak ditemukan" });
    }

    await edit.update({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      namapengguna: req.body.namapengguna,
      idrole: req.body.idrole,
      status: req.body.status,
      foto: req.body.foto,
    });

    res.status(200).send({
      message: "Update pengguna berhasil",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.editRole = async (req, res) => {
  try {
    const { idrole } = req.params;

    const edit = await Role.findOne({ where: { idrole } });

    if (!edit) {
      return res.status(404).send({ message: "Role tidak ditemukan" });
    }

    await edit.update({
      role: req.body.role,
      status: req.body.status,
    });

    res.status(200).send({
      message: "Update role berhasil",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getRoleDetails = async (req, res) => {
  try {
    const roleId = req.params.idrole; // Ambil ID peran dari query parameter

    const roleDetails = await Role.findOne({ where: { idrole: roleId } });

    if (!roleDetails) {
      return res.status(404).json({ message: "Detail peran tidak ditemukan" });
    }

    // Mengirimkan detail peran sebagai respons
    res.status(200).json({
      idrole: roleDetails.idrole,
      role: roleDetails.role,
      status: roleDetails.status,
      // tambahkan informasi lainnya sesuai kebutuhan
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.idpengguna;

    const userDetails = await Pengguna.findOne({
      where: { idpengguna: userId },
    });

    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "Detail Pengguna tidak ditemukan" });
    }

    res.status(200).json({
      username: userDetails.username,
      password: userDetails.password,
      namapengguna: userDetails.namapengguna,
      idrole: userDetails.idrole,
      status: userDetails.status,
      foto: userDetails.foto,
    });
  } catch (error) {}
};
