const express = require("express");
const _ = express.Router();

const Brand = require("../../models/brand.js");

_.post("/createbrand", (req, res) => {
  const { name, merchant } = req.body;

  let brand = new Brand({
    name,
    merchant,
  });

  brand.save();
  res.json(brand);
});

_.post("/brandstatus", async (req, res) => {
  const { name, status } = req.body;

  let updatedBrand = await Brand.findOneAndUpdate(
    { name },
    { status },
    {
      new: true,
    }
  );

  res.json(updatedBrand);
});

module.exports = _;
