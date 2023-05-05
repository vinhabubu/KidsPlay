const mongoose = require("mongoose");

const ListHomeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ListHome", ListHomeSchema);
