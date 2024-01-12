const { stringify } = require("csv-stringify");
const fs = require("fs");

require("dotenv").config({ path: "../.env" });
const path = require("path");

const createTimesheetCSV = () => {
  const file = path.join(__dirname, "../assets/timesheet.csv");
  return fs.createWriteStream(file);
};

const updateTimeSheet = async (records, days) => {
  const writableStream = createTimesheetCSV();
  if (!writableStream) {
    throw new Error("Writable file not found");
  }
  const columns = [
    "Month",
    "Year",
    "Code",
    "Email",
    "Name of Emplyee",
    "Pan No",
    "UAN No",
    "D.O.J",
    "Bank Account No",
    "Bank Name",
    ...days,
    "Present",
    "Absents",
    "Total Leaves Allocated",
    "Paid Leaves Already Taken",
    "Extra Working",
    "Work From Home",
    "Week Off / Holiday",
    "Working",
    "Paid Leaves",
    "Unpaid Leaves",
    "Net Working Days",
    "pf_employee",
    "pf_employer",
    "professional_tax",
    "Advance",
    "TDS",
    "Previous Adjustment",
    "Payable Salary",
    "Net Salary",
    "Total Salary",

  ];
  const stringifier = stringify({ header: true, columns: columns });
  records.map((row) => {
    stringifier.write(row);
  });
  stringifier.pipe(writableStream);
};


module.exports = { updateTimeSheet };
