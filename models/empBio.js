const mongoose = require("mongoose");

// schema
const empBio = new mongoose.Schema(
  {
    contact: {
      type: String,
      required: true,
    },
    profile: {
      type: Object,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employee",
    },
  },
  {
    timestamps: true,
  }
);

const empBiodata = mongoose.model("empBio", empBio);
module.exports = empBiodata;
