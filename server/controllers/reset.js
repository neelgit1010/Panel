const nodemailer = require("nodemailer");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const handleResetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    console.log(link);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "abc@gmail.com",
          pass: "abcdef",
        },
      });

      const mailOptions = {
        from: "biretec354@adosnan.com",
        to: "nosagah877@advitize.com",
        subject: "Password Reset",
        text: `Your temporary password reset link is: ${link}, The link is valid for 5 minutes. Click on the link to reset your password.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  console.log(process.env.JWT_SECRET, oldUser.password);
  
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    if (!token || !secret) {
      throw new Error("Token or secret missing");
    }
    const verify = jwt.verify(token, secret);
    if (!verify || !verify.email) {
      throw new Error("Verification failed");
    }
    console.log(verify, token, secret);
    
    res.render("index", { email: verify.email, id: verify.id, token: token});
  } catch (error) {
    console.error("Verification error:", error);
    res.status(400).send("Not Verified");
  }
};

const setNewPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;
  // console.log(req.body);
  

  // Check if password and confirmPassword are provided and match
  if (!password || !confirmPassword) {
    return res.status(400).json({ status: "Password fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ status: "Passwords do not match" });
  }

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(404).json({ status: "User Not Exists!!" });
  }

  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    if (!token || !secret) {
      throw new Error("Token or secret missing");
    }

    const verify = jwt.verify(token, secret);
    if (!verify || !verify.email) {
      throw new Error("Verification failed");
    }

    // Hash the new password
    const hashPassword = await bcrypt.hash(password, 10);
    
    // Update the user's password
    await User.updateOne(
      { _id: id },
      {
        $set: { password: hashPassword },
      }
    );
    res.json({ status: "Password Reset Successful" });
    // res.render("index",  { email: verify.email, id: verify.id, token: token, status: "verified" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(400).send("Not Verified");
  }
};


module.exports = { handleResetPassword, getResetPassword, setNewPassword };