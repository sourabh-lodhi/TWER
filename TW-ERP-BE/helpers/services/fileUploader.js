const multer = require("multer");
const path = require("path");
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/user/profiles");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      req.user.empCode + "-" + Date.now() + path.parse(file.originalname).ext
    );
  },
});

let fileFilter = function (req, file, cb) {
  var allowedMimes = ["image/jpg", "image/jpeg", "image/png"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        success: false,
        message: "Invalid file type. Only jpg, jpeg, png image files are allowed.",
      },
      false
    );
  }
};

let obj = {
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
  fileFilter: fileFilter,
};
const upload = multer(obj).single("file");
exports.fileUpload = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.status(500);
      if (error.code == "LIMIT_FILE_SIZE") {
        error.message = "File Size is too large. Allowed file size is maximum 2MB";
        error.success = false;
      }
      return res.status(400).json({ error: error.message });
    } else {
      if (!req.file) {
        return res.status(400).json({ error: "file not found" });
      }
      return next()
    }
  });
};
