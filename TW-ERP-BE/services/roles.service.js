const { Roles } = require("../models");

class RoleServices {
  findRole = async () => {
    try {
      return await Roles.find({
        role_slug: {
          $ne: 1,
        },
      });
    } catch (error) {
      return error;
    }
  };
}

const roleService = new RoleServices();

module.exports = roleService;
