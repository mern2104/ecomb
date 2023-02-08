const express = require("express");
const _ = express.Router();

_.get("/registration", () => {
  res.json("Ami Api Route");
});

module.exports = _;
