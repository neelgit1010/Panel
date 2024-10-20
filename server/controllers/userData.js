const userData = require("../models/userData");

const createUserData = async (req, res) => {
    const { title, description, price, } = req.body;
    try {
        const newUserData = new userData({
            title,
            description,
            price,
            createdBy : req.user.userId
        });
    
        await userData.create(newUserData);
        // console.log(newUserData);
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

module.exports = { createUserData }