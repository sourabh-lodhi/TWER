const { Leaves, LeaveStatusHistory } = require('../models')
const { filter, sendLeaveStatusMail } = require('../helpers')
const userService = require('./userService')

class LeaveServices {
  createLeave = async (leave) => {
    try {
      return await Leaves.create(leave)
    } catch (error) {
      throw new Error(error)
    }
  }

  findLeavesById = async (id) => {
    try {
      return await Leaves.findById(id).populate({
        path: `from`,
        model: `Users`,
        select: ['_id', 'email', 'fullName'],
      })
    } catch (error) {
      return error
    }
  }

  filterLeaves = async ({
    status,
    search,
    email,
    startDate,
    endDate,
    to,
    from,
    userId
  }) => {
    try {
      return await filter({
        userId,
        status,
        search,
        email,
        startDate,
        endDate,
        to,
        from,
      })
    } catch (error) {
      return error
    }
  }

  findOneLeave = async (id) => {
    try {
      return await Leaves.findOne({
        _id: id,
        // fromDate: { $gte: moment().format() },
      })
    } catch (error) {
      return error
    }
  }

  createLeaveStatusHistory = async (id, commentedBy, status, comment) => {
    try {
      return await LeaveStatusHistory.create({
        leaveId: id,
        commentedBy,
        status,
        comment,
      })
    } catch (error) {
      return error
    }
  }

  checkApprovedBy = async (id, obj) => {
    return await Leaves.findOneAndUpdate(
      { _id: id },
      {
        ...obj,
      },
      { new: true },
    )
  }

  updateLeaveStatus = async (id, status, leave, commentedBy, comment) => {
    try {
      let checkStatus = status
      if (leave.type.includes('extra')) {
        let data = {}
        if (status == 'approved') {
          const checkApprovedBy = leave.approvedBy.some(
            (e) => e.toString() == commentedBy.toString(),
          )
          if (!checkApprovedBy) {
            data = await this.checkApprovedBy(id, {
              $push: {
                approvedBy: commentedBy,
              },
            })
          } else {
            return { status: false }
          }
        } else {
          data = await this.checkApprovedBy(id, {
            $pull: {
              approvedBy: commentedBy,
            },
          })
        }
        if (data.approvedBy.length == 1) {
          checkStatus = 'pending'
        }
        if (data.approvedBy.length >= 2) {
          checkStatus = 'approved'
        }
      }

      const approvedBy = await userService.findUserById(commentedBy)



      const updatedleave = await Leaves.findOneAndUpdate(
        { _id: id },
        { status: checkStatus },
        { new: true },
      ).populate({
        path: 'from',
        model: 'Users',
        select: ['fullName', 'empCode'],
      })
      if (status !== 'pending') {
        // sendLeaveStatusMail(updatedleave, approvedBy, comment)
      }
      return updatedleave
    } catch (error) {
      return error
    }
  }
  getCommentHistory = async (id) => {
    try {
      return await LeaveStatusHistory.find({ leaveId: id })
        .populate({
          path: 'leaveId',
          model: 'Leaves',
          select: ['-__v', '-to', '-cc'],
        })
        .populate({
          path: 'commentedBy',
          model: 'Users',
          select: ['fullName', 'email', '_id'],
        })
    } catch (error) {
      return error
    }
  }
  getLeavesByUser = async (user, condition) => {
    try {
      return Leaves.find({ from: user, ...condition }).populate('from')
    } catch (error) {
      return error
    }
  }
}

const leaveServices = new LeaveServices()
module.exports = leaveServices
