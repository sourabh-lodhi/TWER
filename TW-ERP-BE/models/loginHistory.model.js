const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);
const LoginHistory = mongoose.model("LoginHistory", loginHistorySchema);

exports.LoginHistory = LoginHistory;
