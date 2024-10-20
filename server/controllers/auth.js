const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const handleUserLogin = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Authentication failed! Invalid Username or Password", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Authentication failed! Invalid Username or Password", success: false });
        }
        
        const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: 40 });
        res.status(200).json({ message: "User logged in successfully!", success: true, token, email, name: user.name });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const handleUserRegister = async (req, res) => {

    try {
        const { email, name, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists", success: false });
        }
        
        const newUser = await User.create({ email, name, password });
        newUser.password = await bcrypt.hash(newUser.password, 10);
        await newUser.save();
        res.status(201).json({ message: "User Created successfully!", success: true });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }

}

module.exports = { handleUserLogin, handleUserRegister }