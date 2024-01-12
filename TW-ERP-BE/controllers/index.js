module.exports = {
  ...require("./auth.controller"),
  ...require("./leave.controller"),
  ...require("./timesheet.controller"),
  ...require("./users.controller"),
  ...require("./role.controller"),
};
