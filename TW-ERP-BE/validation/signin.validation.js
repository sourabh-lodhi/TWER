const Joi = require("joi");

exports.signinValidation = (req, res, next) => {
  const user = (user) => {
    const JoiSchema = Joi.object({
      email: Joi.string().trim().email().max(50).required(),
      password: Joi.string().trim().min(5).max(30).required(),
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
