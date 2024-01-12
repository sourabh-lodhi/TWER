const messages = require("../../../constant");
const { Roles } = require("../../../models");

exports.initial = () => {
  Roles.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      Roles.insertMany([
        { role_slug: 4, name: messages.role.DEVELOPER },
        { role_slug: 3, name:  messages.role.TEAMLEAD },
        { role_slug: 2, name:  messages.role.HRM },
        { role_slug: 1, name:  messages.role.SUPER_ADMIN },
      ]).catch((err) => {
        if (err) {
          throw new Error(err);
        }
      });
    }
  });
};
