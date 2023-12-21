const express = require("express");
const { login, register ,getSessionData} = require("../controllers/auth");
const { getOrders, getBengkel, pemesanan} = require("../controllers/bengkels");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/mitra/datapesanan", getOrders);
router.get("/kelas", getBengkel);
router.post("/pemesanan", pemesanan);
router.get("/session-data", getSessionData);
module.exports = router;
