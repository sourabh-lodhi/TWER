const { superAdmin, hrm, teamLead } = require("../config/config");
const messages = require("../constant");
const { Roles } = require("../models");
const roleService = require("../services/roles.service");

exports.roleManager = async (req, res) => {
  try {
    const { name: role } = req.user.role;
    let response;
    if (role === superAdmin) {
      response = role;
    } else if (role === hrm) {
      response = role;
    } else if (role === teamLead) {
      response = role;
    } else {
      response = role;
    }
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getRoles = async (req, res) => {
  try {
    const getRoles = await roleService.findRole();
    if (!getRoles) {
      return res
        .status(403)
        .json({ error: messages.errorMessages.DATA_NOT_FOUND });
    }
    return res.status(200).json({ message: true, roles: getRoles });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
