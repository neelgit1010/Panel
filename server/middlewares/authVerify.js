const jwt = require("jsonwebtoken");

const handleUserVerification = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Token after 'Bearer'

    if (!token) {
        return res
            .status(401)
            .json({ status: "fail", message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res
            .status(401)
            .json({ status: "fail", message: "Unauthorized: Invalid token" });
    }
};

module.exports = handleUserVerification;