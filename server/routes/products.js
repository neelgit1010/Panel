const router = require("express").Router();
const { getProducts } = require("../controllers/products");
const handleUserVerification = require("../middlewares/authVerify");

router.get("/",handleUserVerification, getProducts);

module.exports = router