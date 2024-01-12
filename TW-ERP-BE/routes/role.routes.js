const router = require("express").Router({ mergeParams: true });

const auth = require("../middlewares");
const { roleManager, getRoles } = require("../controllers");
const { checkRole } = require("../middlewares");
const { teamLead, hrm, developer, superAdmin } = require("../config");

router.get(
  "/",
  [auth.verifyToken],
  checkRole(teamLead, hrm, developer, superAdmin),
  roleManager
);
router.get(
  "/getRoles",
  [auth.verifyToken],
  checkRole(hrm, superAdmin),
  getRoles
);

module.exports = router;
