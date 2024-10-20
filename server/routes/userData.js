const router = require("express").Router();
const { createUserData } = require("../controllers/userData");
const handleUserVerification = require("../middlewares/authVerify");

router.post("/",handleUserVerification, createUserData);

module.exports = router