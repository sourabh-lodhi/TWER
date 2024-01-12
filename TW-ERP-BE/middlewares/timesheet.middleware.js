require("dotenv").config();
const fs = require("fs");
const FS = require("../helpers/utils");

const multer = require("multer");
const path = require("path");
const { compareBcrypt } = require("../helpers");
const { decryptSalaryPassword } = require("../services");
const messages = require("../constant/messages");

let sourcePath = path.join(__dirname, `../assets/timesheets`);

const timesheetPathCheck = (req, res, next) => {
  if (!FS.isPathExists(sourcePath)) {
    fs.mkdirSync(sourcePath);
  }
  const { month, year } = req.query;

  var yearPath = path.join(sourcePath, `/${year}`);

  if (!FS.isPathExists(yearPath)) {
    fs.mkdirSync(yearPath);
  }

  const monthPath = path.join(yearPath, `/${month}`);

  if (!FS.isPathExists(monthPath)) {
    fs.mkdirSync(monthPath);
  }
  next();
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { month, year } = req.query;
    cb(null, path.join(sourcePath, `/${year}/${month}`));
  },
  filename: function (req, file, cb) {
    let [filename, fileExtension] = file?.originalname.split(".xlsx");
    filename =
      filename + "-" + req.query.month + "-" + req.query.year + ".xlsx";
    cb(null, filename);
    req.body.file = file.fieldname;
  },
});
const reportStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(sourcePath));
  },
  filename: function (req, file, cb) {
    let [filename, fileExtension] = file?.originalname.split(".csv");
    filename =
      filename + "-" + Date.now() + ".csv";
    cb(null, filename);
    req.body.file = file.fieldname;
  },
});

const validateUploadTimesheetRoute = (req, res, next) => {
  const checkPassword = compareBcrypt(req, req.user.password);

  if (!checkPassword) {
    //remove uploaded file
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: messages.auth.INVALID_CREDENTIALS });
  }
  const decryptedSalaryPass = decryptSalaryPassword(
    req.user.salary_password,
    req.body.password
  );

  if (decryptedSalaryPass !== req.body.salary_password) {
    //remove uploaded file
    fs.unlinkSync(req.file.path);
    return res
      .status(400)
      .json({ error: messages.auth.INVALID_SALARY_PASSWORD });
  }
  req.salary_password = decryptedSalaryPass;
  next();
};

const upload = multer({ storage: storage });
const uploadReport = multer({ storage: reportStorage });


const timesheet = {
  upload,
  uploadReport,
  timesheetPathCheck,
  validateUploadTimesheetRoute,
};
module.exports = timesheet;
