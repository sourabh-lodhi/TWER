const router = require("express").Router({ mergeParams: true });

const { teamLead, hrm, superAdmin } = require("../config");
const {
  AllLeaves,
  applyLeave,
  MyLeaves,
  updateStatus,
  GetComments,
  AddComment,
  getCC,
} = require("../controllers/");
const auth = require("../middlewares")

const { checkRole } = require("../middlewares");
const {
  applyLeavesValidation,
  updateStatusValidation,
} = require("../validation");

router.post("/apply", [auth.verifyToken], applyLeavesValidation, applyLeave);
router.get("/getCc", [auth.verifyToken], getCC);
router.get("/myLeaves", [auth.verifyToken], MyLeaves);
router.get(
  "/comments",
  [auth.verifyToken],
  GetComments
);

router.get(
  "/:id",
  [auth.verifyToken],
  AllLeaves
);
router.get(
  "/",
  [auth.verifyToken],
  checkRole(hrm, superAdmin, teamLead),
  AllLeaves
);


router.put("/changeStatus/:id", [auth.verifyToken], checkRole(hrm, superAdmin, teamLead), updateStatusValidation, updateStatus);

module.exports = router;
