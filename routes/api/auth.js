const express = require("express");
const _ = express.Router();

_.get("/registration", (req, res) => {
  res.send("Ami Api Route");
});

module.exports = _;
