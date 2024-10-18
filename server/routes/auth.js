const { handleUserLogin, handleUserRegister } = require("../controllers/auth");
const { handleLoginValidation, handleRegisterValidation } = require("../middlewares/authValidation");

const router = require("express").Router();

router.post("/login", handleLoginValidation, handleUserLogin);

router.post("/register", handleRegisterValidation ,handleUserRegister);

module.exports = router