const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadDir, getDate } = require("../config/storage");

// Konfigurasi penyimpanan file menggunakan multer
exports.upload = async (req, res) => {
  // Cek apakah ada file yang diupload

  if (!req.file) {
    res.status(400).send("Tidak ada file yang diupload");
    return;
  }

  // Dapatkan file yang diupload
  const file = req.file;

  // Simpan file ke folder upload
  if (!file) {
    res.status(500).send(err);
    return;
  }
  const fileName = getDate + "-" + file["originalname"];
  // Buat response berupa URL file
  const url = `/uploads/${fileName}`;
  res.status(200).send({
    url,
  });
};
