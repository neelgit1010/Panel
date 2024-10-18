const router = require("express").Router();
const { getProducts } = require("../controllers/products");
const handleUserVerification = require("../middlewares/authVerify");

router.get("/",handleUserVerification, (req, res)=> {
    res.status(200).json([
        {
            id: 1,
            name: "Product 1",
            description: "Description for Product 1",
        },
        {
            id: 2,
            name: "Product 2",
            description: "Description for Product 2",
        },
    ]);
});

module.exports = router