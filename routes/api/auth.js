const express = require("express");
const _ = express.Router();

// registration
_.post("/registration", (req, res) => {
  let { email, fullname, password, isSubscribe } = req.body;

  if (!email) {
    return res.json({ error: "You must enter an email address" });
  }

  if (!fullname) {
    return res.json({ error: "You must enter an fullname" });
  }
  if (!password) {
    return res.json({ error: "You must enter an password" });
  }

  res.json({ email, fullname, password, isSubscribe });
});

module.exports = _;
