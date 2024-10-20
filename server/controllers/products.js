const UserData = require("../models/userData");

const getProducts = async (req, res) => {
    
    try {
        const products = await fetchProducts(req);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fetchProducts = async (req) => {

    let data;
    try {
        const response = await UserData.find({ createdBy: req.user.userId });
        if (response) {
            data = response;
        } else {
            throw new Error("No products found");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
    
    return data;
}

module.exports = { getProducts }