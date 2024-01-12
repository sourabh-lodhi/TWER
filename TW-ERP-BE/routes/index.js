const router = require("express").Router({ mergeParams: true });

const leavesRoutes = require("./leaves.routes");
const authRoutes = require("./auth.routes");

const timesheetRoutes = require("./timesheet.routes");
const roleRoutes = require("./role.routes");
const userRoutes = require("./users.routes");

router.use("/leaves", leavesRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/timesheet", timesheetRoutes);
router.use("/roles", roleRoutes);

module.exports = router;
