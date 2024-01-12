const { superAdmin, hrm, teamLead } = require('../config/config')
const messages = require('../constant')
const userService = require('../services/userService')
const { UserAccountService } = require('../services/userAccountService')
const { compareBcrypt, encrypt, decrypt } = require('../helpers')
const FS = require('../helpers/utils')

const userAccountService = new UserAccountService()

exports.createUser = async (req, res) => {
  const { email, empCode } = req.body
  try {
    const findUser = await userService.findUserByEmail(email)
    if (findUser) {
      return res.status(400).json({
        error: messages.auth.USER_ALREADY_EXISTS,
      })
    }
    const findUserByEmpCode = await userService.getUserByEmpCode(empCode)
    if (findUserByEmpCode) {
      return res.status(400).json({
        error: messages.auth.EMPCODE_EXISTS,
      })
    }
    const user = await userService.createUser(req.body)
    if (!user) {
      return res.status(403).json({
        error: messages.errorMessages.DATA_NOT_FOUND,
      })
    } else {
      req.body.salary_password = userService.decryptSalaryPassword(
        req.user.salary_password,
        req.body.super_password,
      )
      req.body.user = user._id
      await userAccountService.createEditUserAccount(req.body)
    }
    return res.status(200).json({
      message: messages.auth.REGISTER_SUCCESS,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.changePassword = async (req, res) => {
  try {
    if (req.body.new_password === req.body.password) {
      return res
        .status(400)
        .json({ error: messages.errorMessages.MATCH_ERROR_PASSWORD })
    }

    const verifyPassword = compareBcrypt(req, req.user.password)
    if (!verifyPassword) {
      return res
        .status(400)
        .json({ error: messages.errorMessages.INVALID_PASSWORD })
    }

    let salary_password = ''

    if (req.user.role === 1 && req.user.salary_password) {
      salary_password = userService.decryptSalaryPassword(
        req.user.salary_password,
        req.body.password,
      )

      if (!salary_password) {
        return res
          .status(400)
          .json({ error: messages.errorMessages.INVALID_PASSWORD })
      }

      salary_password = userService.encryptSalaryPassword(
        salary_password,
        req.body.new_password,
      )
    }

    const user = await userService.changePassword(req.user._id, req.body)
    if (user) {
      return res.status(201).json({
        message: messages.successMessages.PASSWORD_CHANGED,
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: messages.errorMessages.SOMETHING_WENT_WRONG,
    })
  }
}

exports.getUsers = async (req, res) => {
  const { _id } = req?.user
  const { id } = req?.query
  try {
    let result
    if (id) {
      result = await userService.findUserById(id)
    } else {
      result = await userService.getUsers(_id)
    }
    return res.status(200).json({
      data: result,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req?.query
  try {
    let result = await userService.updateOneUser(id, req.body)
    return res.status(200).json({
      success: messages.auth.USER_DETAILS_UPDATED_SUCCESSFULLY,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.updateUserStatus = async (req, res) => {
  const { id, status } = req?.body
  try {
    let result = await userService.updateUserStatus(id, status)
    if (!result) {
      return res.status(400).json({
        success: messages.errorMessages.SOMETHING_WENT_WRONG,
      })
    }
    return res.status(200).json({
      success: messages.status.STATUS_UPDATED_SUCCESSFULLY,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.salaryPassword = async (req, res) => {
  try {
    const { salary_password, password } = req.body

    const validatePassword = compareBcrypt(req, req.user.password)
    if (!validatePassword) {
      return res
        .status(400)
        .json({ success: false, error: messages.auth.UNAUTHORIZED })
    }
    const new_password = userService.encryptSalaryPassword(
      salary_password,
      password,
    )
    await userService.updateOneUser(req.user._id, {
      salary_password: new_password,
    })

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req?.query
  try {
    if (id) {
      let result = await userService.deleteUser(id)
      return res.status(200).json({
        success: messages.successMessages.USER_DELETED_SUCCESSFULLY,
      })
    }
    return res.status(400).json({
      error: messages.errorMessages.INVALID_USER_ID,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const { profile_image } = req.user
    if (profile_image) {
      const filePath = `public/user/profiles/${profile_image}`
      FS.unlinkFile(filePath)
    }
    req.user.profile_image = req.file?.filename
    await req.user.save()
    return res.status(200).json({
      messages: 'Profile upload successfully',
      data: req.user,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.updateUserAccount = async (req, res) => {
  try {
    let result = await userAccountService.updateUserAccount(req?.body)

    if (!result) {
      return res.status(400).json({
        error: messages.errorMessages.SOMETHING_WENT_WRONG,
      })
    }
    return res.status(200).json({
      success: messages.status.STATUS_UPDATED_SUCCESSFULLY,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}
