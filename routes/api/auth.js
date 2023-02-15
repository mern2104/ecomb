const express = require("express");
const _ = express.Router();
const User = require("../../models/user.js");
var jwt = require('jsonwebtoken');
// registration
_.post("/registration", (req, res) => {
  let { email, phoneNumber, firstName, lastName, password } = req.body;

  if (!email) {
    return res.json({ error: "You must enter an email address" });
  }

  if (!firstName) {
    return res.json({ error: "You must enter an firstName" });
  }

  if (!lastName) {
    return res.json({ error: "You must enter an lastName" });
  }

  if (!password) {
    return res.json({ error: "You must enter an password" });
  }

  const user = new User({
    email,
    phoneNumber,
    firstName,
    lastName,
    password,
  });

  user.save();

  let token = jwt.sign(user.email, ">@H%rH@>MDW(N72", { expiresIn: "1h" });

  res.json(token);
});

module.exports = _;
