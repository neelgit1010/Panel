const joi = require("joi");

const handleRegisterValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        name: joi.string().min(4).max(50).required(),
        password: joi.string().min(6).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
    next();
};

const handleLoginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
    next();
};

module.exports = { handleRegisterValidation, handleLoginValidation };