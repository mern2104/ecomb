const express = require("express");
const _ = express.Router();
const User = require("../../models/user.js");

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

  res.json(user);
});

module.exports = _;
