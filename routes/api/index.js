const express = require("express");
const _ = express.Router();
const authRoutes = require("./auth");
const brandRoutes = require("./brand");

// auth routes
_.use("/auth", authRoutes);
_.use("/brand", brandRoutes);

module.exports = _;
