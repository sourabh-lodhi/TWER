const Joi = require('joi')

exports.userStatusValidation = (req, res, next) => {
  const user = (user) => {
    const JoiSchema = Joi.object({
      id: Joi.string().required(),
      status: Joi.string().valid('active', 'inactive').required(),
    })
    return JoiSchema.validate(user)
  }
  const response = user(req.body)
  const error = response.error
  if (error) {
    return res.status(422).json({
      error: error.details[0].message,
    })
  } else {
    next()
  }
}

exports.userValidation = (req, res, next) => {
  const user = (user) => {
    const JoiSchema = Joi.object({
      empCode: Joi.string().trim().min(4).max(4).required(),
      fullName: Joi.string().trim().min(0).max(30).required(),
      email: Joi.string().trim().email().max(50).required(),
      password: Joi.string().trim().min(5).max(30).required(),
      role: Joi.number().required(),
      pf_status: Joi.boolean().required(),
      salary: Joi.number().required(),
      DOB: Joi.date().required(),
      joiningDate: Joi.date().required(),
      allocatedLeaves: Joi.number().required(),
      super_password: Joi.string().required(),
      salary_password: Joi.string().required(),
    })
    return JoiSchema.validate(user)
  }
  const response = user(req.body)
  const error = response.error
  if (error) {
    return res.status(422).json({
      error: error.details[0].message,
    })
  } else {
    next()
  }
}

exports.salaryPasswordValidation = (req, res, next) => {
  const salaryPassword = (data) => {
    const JoiSchema = Joi.object({
      salary_password: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    })
    return JoiSchema.validate(data)
  }
  const response = salaryPassword(req.body)
  const error = response.error
  if (error) {
    return res.status(422).json({
      error: error.details[0].message,
    })
  } else {
    next()
  }
}

exports.changePasswordValidation = (req, res, next) => {
  const changePassword = (data) => {
    const JoiSchema = Joi.object({
      new_password: Joi.string().trim().min(6).max(30).required(),
      password: Joi.string().trim().min(6).max(30).required(),
    })
    return JoiSchema.validate(data)
  }
  const response = changePassword(req.body)
  const error = response.error
  if (error) {
    return res.status(422).json({
      error: error.details[0].message,
    })
  } else {
    next()
  }
}

exports.userAccountValidation = (req, res, next) => {
  let pan_pattern = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/

  const userAccount = (data) => {
    const JoiSchema = Joi.object({
      pf_status: Joi.boolean(),
      user: Joi.string(),
      pan_no: Joi.string().pattern(new RegExp(pan_pattern)),
      aadhar_no: Joi.number().min(12),
      uan_no: Joi.number().min(12),
      esi_no: Joi.number().min(17).unsafe(),
      account_no: Joi.number().min(12),
    })
    return JoiSchema.validate(data)
  }
  const response = userAccount(req.body)
  const error = response.error
  if (error) {
    return res.status(422).json({
      error: error.details[0].message,
    })
  } else {
    next()
  }
}
