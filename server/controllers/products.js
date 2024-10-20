const UserData = require("../models/userData");

const getProducts = async (req, res) => {
    console.log(req.user);
    
    try {
        const products = await fetchProducts(req);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fetchProducts = async (req) => {
/*************  ✨ Codeium Command 🌟  *************/
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
    
    // const response = await userData.find({ createdBy: req.user.userId });
    // const data = await response.json();
    // console.log(data);
/******  0bf4d54b-ab8e-40f5-8e96-4a4b078e8573  *******/
    
    return data;
}

module.exports = { getProducts }