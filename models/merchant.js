const mongoose = require("mongoose");
const { Schema } = mongoose;

const merchantSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  brandName: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    default: null,
  },
  isActive: {
    type: Boolean,
    defalut: false,
  },
  status: {
    type: String,
    default: "waiting",
    enum: ["waiting", "rejected", "approved"],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Merchant", merchantSchema);
