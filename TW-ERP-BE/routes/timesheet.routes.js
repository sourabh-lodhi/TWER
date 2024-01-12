const router = require("express").Router({ mergeParams: true });
const auth = require("../middlewares");
const { timesheetPathCheck, upload, checkRole, uploadReport } = require("../middlewares");
const { superAdmin } = require("../config");
const { uploadTimesheet, sendPaySlips } = require("../controllers");
const { timesheetValidation } = require("../validation");
const timesheet = require("../middlewares/timesheet.middleware");

router.post(
  "/upload",
  [auth.verifyToken],
  checkRole(superAdmin),
  timesheetPathCheck,
  upload.single("timesheet"),
  timesheetValidation,
  [timesheet.validateUploadTimesheetRoute],
  uploadTimesheet
);

router.post(
  '/sendPaySlip',
  [auth.verifyToken],
  checkRole(superAdmin),
  uploadReport.single('report'),
  sendPaySlips)

module.exports = router;
