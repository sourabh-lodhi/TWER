const Joi = require("joi");

exports.applyLeavesValidation = (req, res, next) => {
  const leave = (leave) => {
    const JoiSchema = Joi.object({
      to: Joi.array().items(Joi.string().required()).required(),
      cc: Joi.array().items(Joi.string().required()).required(),
      description: Joi.string().required(),
      type: Joi.string()
        .valid(
          "earlyGoing",
          "fullDay",
          "firstHalf",
          "secondHalf",
          "wfhFullDay",
          "wfhSecondHalf",
          "wfhFirstHalf",
          "extraFullDay",
          "extraSecondHalf",
          "extraFirstHalf",
        )
        .required(),
      fromDate: Joi.string().required(),
      toDate: Joi.string().required(),
      fromTime: Joi.string().required(),
      toTime: Joi.string().required(),
      days: Joi.number().optional(),
      hours: Joi.number().optional(),
    });
    return JoiSchema.validate(leave);
  };
  const response = leave(req.body);
  const error = response.error;
  if (error) {
    return res.status(422).json({
      error: error.details[0].message,
    });
  } else {
    next();
  }
};

exports.updateStatusValidation = (req, res, next) => {
  const user = (user) => {
    const JoiSchema = Joi.object({
      status: Joi.string().valid("approved", "rejected").required(),
      comment: Joi.when("status", {
        is: "rejected",
        then: Joi.string().required(),
        otherwise: Joi.forbidden(),
      }),
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
