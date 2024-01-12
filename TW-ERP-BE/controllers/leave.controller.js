require("dotenv").config();
const moment = require("moment");

const { cc } = require("../helpers");
const formate = require("../helpers");
const messages = require("../constant");
// const { Leaves, Users, LeaveStatusHistory } = require("../models");
const userService = require("../services");
const leaveServices = require("../services");
const {
  getMonthDateRange,
  monthsString,
} = require("../helpers/utils/timesheetUtil");
const { Leaves } = require("../models");

exports.applyLeave = async (req, res) => {
  try {
    const {
      to,
      cc,
      description,
      type,
      fromDate,
      toDate,
      fromTime,
      toTime,
    } = req.body
      console.log("🚀 ~ file: leave.controller.js:28 ~ exports.applyLeave= ~ fromDate",{fromDate,toDate})

    if (!req?.user) {
      return res.status(400).json({
        error: messages.auth.NOT_FOUND,
      })
    }
    const from = req?.user?._id

    for (let i in to) {
      const findUser = await userService.findUserByEmail(to[i])
      if (!findUser) {
        return res
          .status(400)
          .json({ error: `${to[i]} ${messages.auth.EMAIL_NOT_EXISTS}` })
      }
    }
    let leave = {
      from,
      to,
      cc,
      description,
      fromDate: moment(new Date(fromDate)).toISOString(),
      toDate: moment(new Date(toDate)).toISOString(),
      type,
      fromTime,
      toTime,
      hours: 0,
      days: 0,
    };
    console.log("🚀 ~ file: leave.controller.js:45 ~ exports.applyLeave= ~ leave:", leave)

    let days;
    if (type === "earlyGoing") {
      const monthAndYear = fromDate?.split("-");
      const getMonthDate = getMonthDateRange(
        monthAndYear[0],
        monthsString[monthAndYear[1] - 1]
      );
      const findEarlyGoings = await Leaves.find({
        $and: [
          { from },
          {
            fromDate: {
              $gte: new Date(moment(getMonthDate.start).format()),
              $lte: new Date(moment(getMonthDate.end).format()),
            },
          },
          { status: "approved" },
        ],
      }).countDocuments();

      if (findEarlyGoings > 4) {
        return res
          .status(429)
          .json({
            message: messages.leave.LEAVES_LIMIT_EXCEEDED,
          });
      }
      let startTime = formate.time(fromTime);
      let endTime = formate.time(toTime);
      let duration = formate.duration(startTime, endTime);
      const hour = parseInt(duration.asHours());
      const minute = parseInt(duration.asMinutes()) - hour * 60;
      const hours = `${hour}h ${minute}m`;

      const timeCheck = parseInt(duration.asMinutes());
      if (timeCheck > 120) {
        return res
          .status(400)
          .json({ error: messages.leave.HOUR_CHECK_FOR_APPLY_LEAVE })
      } else {
        leave.hours = hours
        await leaveServices.createLeave(leave)
      }
    } else if (
      type === 'fullDay' ||
      type === 'wfhFullDay' ||
      type === 'extraFullDay'
    ) {
      if (fromDate !== toDate) {
        let startDate = formate.time(new Date(fromDate))
        let endDate = formate.time(new Date(toDate))
        days = endDate.diff(startDate, 'days') + 1
      } else {
        days = 1
      }
      leave.days = days
      leave.hours = 0
      await leaveServices.createLeave(leave)
    } else {
      days = 0.5
      leave.days = days
      leave.hours = 0
      await leaveServices.createLeave(leave)
    }
    return res.status(200).json({ message: messages.leave.LEAVE_SENT })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.AllLeaves = async (req, res) => {
  let { status, search, email, startDate, endDate } = req.query;

  const userId=req?.user?._id;

  if (startDate) {
    startDate = moment(startDate).toISOString()
  }
  if (endDate) {
    endDate = moment(endDate).toISOString()
  }
  try {
    if (req?.params?.id) {
      const id = req?.params?.id
      let result = await leaveServices.findLeavesById(id)
      return res.status(200).json({
        success: true,
        leave: result,
      })
    }
    if (req.user.user_role.name === process.env.TEAMLEAD) {
      const to = req.user.email
      let result = await leaveServices.filterLeaves({
        userId,
        status,
        search,
        email,
        startDate,
        endDate,
        to,
      })
      return res.status(200).json({ leaves: result })
    }

    let result = await leaveServices.filterLeaves({
      userId,
      status,
      search,
      email,
      startDate,
      endDate,
    })

    return res.status(200).json({ leaves: result })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

exports.MyLeaves = async (req, res) => {
  const from = req?.user?._id
  const { startDate, endDate } = req.query
  let result = await leaveServices.filterLeaves({
    from,
    startDate,
    endDate,
  })
  return res.status(200).json({ leaves: result.allLeaves })
}

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status, comment } = req.body
    const commentedBy = req?.user?._id
    const leave = await leaveServices.findOneLeave(id)

    // if (formate.validateDate(leave.fromDate)) {
    //   return res.status(404).json({ error: messages.leave.PAST_DATE_STATUS })
    // }

    if (!leave) {
      return res.status(404).json({ error: messages.leave.LEAVES_NOT_FOUND })
    }
    if (leave.type == 'earlyGoing') {
      let startDay = formate.dateFormate('DD/MM/YYYY')
      let endDay = formate.dateFormateFrom(leave.fromDate, 'DD/MM/YYYY')
      if (endDay === startDay) {
        if (leave.fromTime < formate.currentTime()) {
          return res.status(400).json({ error: messages.leave.PREVIOUS_STATUS })
        }
      }
    }
    const response = await leaveServices.createLeaveStatusHistory(
      id,
      commentedBy,
      status,
      comment,
    )
    if (!response) {
      res
        .status(400)
        .json({ message: messages.errorMessages.HISTORY_NOT_FOUND })
    }

    const leaveUpdate = await leaveServices.updateLeaveStatus(
      id,
      status,
      leave,
      commentedBy,
      comment
    );
  

    if (!leaveUpdate) {
      return res
        .status(400)
        .json({ message: messages.errorMessages.SOMETHING_WENT_WRONG })
    };

    if (!leaveUpdate?.status) {
      return res
        .status(400)
        .json({ message: messages.errorMessages.ALREADY_APPROVED })
    }
   
    return res
      .status(200)
      .json({ message: messages.status.STATUS_UPDATED, leave: leaveUpdate })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.getCC = (req, res) => {
  try {
    res.status(200).json({ data: cc })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

exports.GetComments = async (req, res) => {
  try {
    const comment = await leaveSerisUservices.getCommentHistory(req.query.id)
    if (!comment) {
      return res.status(400).json({
        error: messages.errorMessages.DATA_NOT_FOUND,
      })
    }

    return res.status(200).json({
      comment,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
};
