const bcrypt = require("bcryptjs");

exports.compareBcrypt = (req, user) => {
  const passwordIsValid = bcrypt.compareSync(req.body.password, user);
  return passwordIsValid;
};
