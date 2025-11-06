const express = require("express");
const router = express.Router();

const { register, login, getProfile } = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

//RUTA de registro PUBLICA
router.post("/register", register);
router.post("/login", login);

//ruta protegida - pasan por el middleware
router.get("/profile", auth, getProfile);






module.exports = router;