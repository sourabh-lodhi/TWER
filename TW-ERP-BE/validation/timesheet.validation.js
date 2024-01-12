const Joi = require("joi");
// const FS = require("../helpers/utils/file.utils");
const fs = require("fs");

exports.timesheetValidation = (req, res, next) => {
  const timesheet = (timesheet) => {
    const JoiSchema = Joi.object({
      month: Joi.string().trim().required(),
      year: Joi.string().trim().required(),
      file: Joi.string().required(),
      salary_password: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });

    return JoiSchema.validate(timesheet);
  };

  req.body = { ...req.body, ...req.query };
  const response = timesheet(req.body);
  const error = response.error;
  if (error) {
    //remove uploaded files
    if(req.file?.path){
      fs.unlinkSync(req.file?.path);
    }
    return res.status(422).json({
      error: error.details[0].message,
    });
  } else {
    next();
  }
};
