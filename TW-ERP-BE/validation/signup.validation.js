const Joi = require("joi");

exports.signupValidation = (req, res, next) => {
  const user = (user) => {
    const JoiSchema = Joi.object({
      empCode: Joi.string().required(),
      fullName: Joi.string().trim().min(0).max(30).required(),
      email: Joi.string().trim().email().max(50).required(),
      password: Joi.string().trim().min(5).max(30).required(),
      role: Joi.number().required(),
      DOB: Joi.date().required(),
      joiningDate: Joi.date().required(),
      leavesTaken: Joi.number(),
      allocatedLeaves: Joi.number().required(),
    });
    return JoiSchema.validate(user);
  };
  const response = user(req.body);
  const error = response.error;
  if (error) {
    return res.status(422).json({
      error: error.details[0].message,
    });
  } else {
    next();
  }
};
