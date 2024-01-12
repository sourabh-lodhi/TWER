const mongoose = require("mongoose");

const leaveStatusHistorySchema = new mongoose.Schema(
  {
    leaveId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Leaves",
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    comment: {
      type: String,
    },
    status: {
      type: String,
      enum: ["approved", "rejected"],
      required: true,
    },
    
  },
  { timestamps: true }
);

const LeaveStatusHistory = mongoose.model(
  "LeaveStatusHistory",
  leaveStatusHistorySchema
);

exports.LeaveStatusHistory = LeaveStatusHistory;
