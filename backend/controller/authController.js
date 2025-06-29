const User = require("../model/User");
const bcryct = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

refreshTokens = [];

const authController = {
  registerUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(404).json("email da ton tai");
      }
      const { email, username, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return res.status(401).json("Sai mat khau");
      }

      const salt = await bcryct.genSalt(10);
      const hashed = await bcryct.hash(password, salt);

      const newUser = new User({
        email,
        username,
        password: hashed,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.REFRESH_TOKEN,
      { expiresIn: "365d" }
    );
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json("nguoi dung khong ton tai");
      }
      const validPassword = await bcryct.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).json("Sai mat khau");
      }
      const accessToken = authController.generateAccessToken(user);
      const refreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      const { password, ...others } = user._doc;

      res.status(200).json({...others, accessToken});
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  },
  requsetRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("RefreshToken khong ton tai");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("refreshToken khong hop le");
    }
    try {
      const user = await new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
          if (err) {
            return reject(err);
          }
          resolve(user);
        });
      });

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logout: async(req, res)=>{
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.status(200).json("Logout Success");
  }
};

module.exports = authController;
