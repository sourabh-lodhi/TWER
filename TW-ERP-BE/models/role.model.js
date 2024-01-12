const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  role_slug: {
    type: mongoose.Schema.Types.Number,
  },
});

const Roles = mongoose.model("Roles", roleSchema);

exports.Roles = Roles;
