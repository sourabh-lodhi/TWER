var crypto = require("crypto");

exports.generateToken = function () {
  return crypto.randomBytes(16).toString("base64");
};
