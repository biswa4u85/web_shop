require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const admin = require("../model/admin");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.findOne({ email });
    if (!user) return res.status(401).json({ errMsg: "Record Not Found" });

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) return res.status(401).json({ errMsg: "Invalid password" });

    //create token data
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
    //create token
    const token = await jwt.sign(tokenData, process.env.JWTSECRET, { expiresIn: "1d" })
    tokenData['token'] = token
    res.status(200).json(tokenData)
  } catch (error) {
    res.status(500).json({ errMsg: "Something Went Wrong" });
  }
};

module.exports = {
  adminLogin
};