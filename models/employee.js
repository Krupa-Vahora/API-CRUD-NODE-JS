const mongoose = require("mongoose");

// schema
const emp = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
});

const employee = mongoose.model("employee", emp);
module.exports = employee;
