const express = require("express");
const _ = express.Router();

// registration
_.post("/registration", (req, res) => {
  let { email, name } = req.body;

  res.json({ email, name });
});

module.exports = _;
