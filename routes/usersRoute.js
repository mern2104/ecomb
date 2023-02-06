const express = require("express");
const _ = express.Router();

_.get("/", function () {
  res.send("ami router");
});

module.exports = _;
