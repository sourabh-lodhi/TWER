require('dotenv').config()
const bcrypt = require('bcryptjs')

const messages = require('../constant')
const { populates, compareBcrypt } = require('../helpers')
const { LoginHistory, Users } = require('../models')
const authServices = require('../services/auth.service')
const userService = require('../services/userService')

verifyToken = async (req, res, next) => {
  try {
    let token = req.headers[process.env.ACCESS_TOKEN]
    if (!token) {
      return res.status(403).json({ error: messages.auth.NO_TOKEN })
    }
    let query = await authServices.findLoginHistory(token)
    if (!query?.user) {
      return res.status(403).json({ error: messages.auth.UNAUTHORIZED })
    }
    const userDetails = await userService.findUserById(query.user)
    if (!query?.token) {
      return res.status(403).json({ error: messages.auth.UNAUTHORIZED })
    }
    req.user = userDetails
    next()
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
checkRole = (...roles) => (req, res, next) => {
  const { name } = req.user.user_role
  if (!roles.includes(name)) {
    return res.status(400).json({ error: messages.auth.NOT_AUTHORIZED })
  }
  return next()
}

verifySuperAdminPassword = async (req, res, next) => {
  try {
    const { super_password, salary_password } = req.body

    const result = bcrypt.compareSync(super_password, req.user.password)
    if (!result) {
      return res.status(400).json({ error: messages.auth.NOT_AUTHORIZED })
    }
    const decryptedSalaryPass = userService.decryptSalaryPassword(
      req.user.salary_password,
      super_password,
    )
    if (salary_password !== decryptedSalaryPass) {
      return res.status(400).json({ error: messages.auth.NOT_AUTHORIZED })
    }
    return next()
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
const auth = {
  verifyToken,
  checkRole,
  verifySuperAdminPassword,
}
module.exports = auth
