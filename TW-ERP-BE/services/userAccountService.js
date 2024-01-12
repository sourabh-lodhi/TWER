const { encrypt } = require('../helpers')
const { UserAccount } = require('../models')
const userService = require('./userService')

class UserAccountService {
  getUserAccountById = async (id) => {
    try {
      return UserAccount.findById(id)
    } catch (error) {
      throw error
    }
  }
  createEditUserAccount = async (body) => {
    try {
      const {
        id,
        pf_status,
        salary,
        salary_password,
        pan_no,
        aadhar_no,
        uan_no,
        esi_no,
        account_no,
      } = body
      let userAccount

      if (id) {
        userAccount = await this.getUserAccountById(id)
        userAccount.salary = userService.encryptSalaryPassword(
          salary,
          salary_password,
        )

        userAccount.pf_status = pf_status
        userAccount.pan_no = pan_no
        userAccount.aadhar_no = aadhar_no
        userAccount.uan_no = uan_no
        userAccount.esi_no = esi_no
        userAccount.account_no = account_no

        return await UserAccount.updateOne({})
      } else {
        body.salary = userService.encryptSalaryPassword(salary, salary_password)
        body.pf_status = pf_status
        body.pan_no = pan_no
        body.aadhar_no = aadhar_no
        body.uan_no = uan_no
        body.esi_no = esi_no
        body.account_no = account_no
        userAccount = new UserAccount(body)
        return await userAccount.save()
      }
    } catch (error) {
      throw error
    }
  }
  updateUserAccount = async (data) => {
    try {
      return await UserAccount.findOneAndUpdate(
        { user: data.user },
        {
          $set: data,
        },
      )
    } catch (error) {
      throw error
    }
  }
  getUserAccountByUser = async (id) => {
    try {
      return UserAccount.findOne({ user: id })
    } catch (error) {
      throw error
    }
  }
}
module.exports = { UserAccountService }
