require("dotenv").config();

module.exports = {
  teamLead: process.env.TEAMLEAD,
  hrm: process.env.HRM,
  developer: process.env.DEVELOPER,
  superAdmin: process.env.SUPER_ADMIN,
  accessToken: process.env.ACCESS_TOKEN,
};
