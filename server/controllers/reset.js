const nodemailer = require("nodemailer");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const handleResetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const secret = oldUser._id + process.env.JWT_SECRET;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    console.log(link);

    //   const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //       user: process.env.EMAIL,
    //       pass: process.env.PASSWORD,
    //     },
    //   });

    //   const mailOptions = {
    //     from: process.env.EMAIL,
    //     to: email,
    //     subject: "Password Reset",
    //     text: `Your temporary password is: ${user.password}`,
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log("Email sent: " + info.response);
    //     }
    //   });
      res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  // res.send("Password reset link sent to your email");
  
  // try {
  //   const oldUser = await User.findById(id);
  //   if (!oldUser) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   const secret = oldUser._id + process.env.JWT_SECRET;
  //   const decoded = jwt.verify(token, secret);
  //   if (decoded.email !== oldUser.email) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }
  //   const { password } = req.body;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   oldUser.password = hashedPassword;
  //   await oldUser.save();
  //   res.status(200).json({ message: "Password reset successfully" });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }

  try {
    const oldUser = await User.findById(id);
    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const secret = oldUser._id + process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    res.render("index", { email: decoded.email });
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch(err){

  }
};

module.exports = { handleResetPassword, getResetPassword };