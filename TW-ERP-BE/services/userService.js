const bcrypt = require('bcryptjs')
const { decrypt, encrypt } = require('../helpers')

const { Users } = require('../models')
class UserServices {
  findUserByEmail = async (email) => {
    try {
      return await Users.findOne({ email })
    } catch (error) {
      return error
    }
  }

  getUserByEmpCode = async (empCode) => {
    try {
      return await Users.findOne({ empCode })
    } catch (error) {
      return error
    }
  }

  createUser = async (data) => {
    const {
      empCode,
      fullName,
      email,
      password,
      role,
      DOB,
      joiningDate,
      allocatedLeaves,
    } = data
    try {
      return await Users.create({
        empCode,
        fullName,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
        DOB,
        allocatedLeaves: parseInt(allocatedLeaves),
        joiningDate,
      })
    } catch (error) {
      return error
    }
  }

  findUserById = async (id) => {
    try {
      return Users.findById(id)
        .populate('user_role')
        .populate('user_account', { salary: 0, __v: 0 })
    } catch (error) {
      return error
    }
  }

  getUsers = async (id) => {
    try {
      return await Users.find({ _id: { $ne: id } })
    } catch (error) {
      return error
    }
  }

  updateOneUser = async (id, data) => {
    try {
      return await Users.updateOne(
        { _id: id },
        {
          $set: data,
        },
      )
    } catch (error) {
      return error
    }
  }

  changePassword = async (id, { new_password, salary_password }) => {
    try {
      return await Users.updateOne(
        { _id: id },
        {
          $set: {
            password: bcrypt.hashSync(new_password, 10),
            salary_password,
          },
        },
      )
    } catch (error) {
      return error
    }
  }

  updateUserStatus = async (id, status) => {
    try {
      return await Users.updateOne(
        { _id: id },
        {
          $set: {
            status: status,
          },
        },
      )
    } catch (error) {
      return error
    }
  }

  deleteUser = async (id) => {
    try {
      return await Users.deleteOne({ _id: id }, { paranoid: false })
    } catch (error) {
      return error
    }
  }
  encryptSalaryPassword = (text, password) => {
    return encrypt(text.toString(), password)
  }
  decryptSalaryPassword = (text, password) => {
    return decrypt(text, password)
  }
}

const userService = new UserServices()
module.exports = userService
