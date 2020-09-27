// routes/users.route.js

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const auth = require("../middleware/auth");
const { User, validate } = require("../models/user.model");


router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber
  });
});

module.exports = router;
