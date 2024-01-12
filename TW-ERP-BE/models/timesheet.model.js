const mongoose = require("mongoose");
const timeSheetSchema = new mongoose.Schema(
  {
    timesheetFile: {
      type: String,
      required: [true, "Timesheet is required"],
    },
    month: {
      type: String,
      required: [true, "Timesheet must have a month"],
    },
    year: {
      type: String,
      required: [true, "Timesheet must have a year"],
    },
    previousTimesheets: [String],
  },
  { timestamps: true }
);

const TimesheetModel = mongoose.model("timesheets", timeSheetSchema);

module.exports = TimesheetModel;
