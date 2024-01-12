var moment = require("moment");
var monthsString = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function getMonthDateRange(year, month) {
  // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
  // array is 'year', 'month', 'day', etc
  var startDate = moment.utc([year, monthsString.indexOf(month), 1]);

  // Clone the value before .endOf()
  var endDate = moment.utc(startDate).endOf("month");

  // make sure to call toDate() for plain JavaScript date type
  return { start: startDate, end: endDate };
}

module.exports = { getMonthDateRange, monthsString };
