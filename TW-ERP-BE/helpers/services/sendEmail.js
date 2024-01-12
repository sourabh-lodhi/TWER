require('dotenv').config()
const fs = require('fs')
const path = require('path');
const moment = require('moment');
const express = require('express');
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');
const { leaveType } = require('../utils');
const leavesViewPath = path.resolve(__dirname, '../../assets/email/templates/leaves');
const wfhViewPath = path.resolve(__dirname, '../../assets/email/templates/workformhome');
const extraDayPath = path.resolve(__dirname, '../../assets/email/templates/extradaywork');



/**
 *  @description This function is use get email templates of leave status based on type of leave
 * @param {string} type leave type
 * @returns {string} returning template path
 */
const getTemplateDir = (type) => {
  if (type.includes('wfh')) {
    return wfhViewPath;
  } else if (type.includes('extra')) {
    return extraDayPath;
  } else {
    return leavesViewPath;
  }
}
/**
 * @description This function is use get subject line of leave status mail based on type and status of leave
 * @param {string} type leave type
 * @param {string} status leave status
 * @param {string} empName name of emplyee that applied leave
 * @param {string} empCode empCode of emplyee that applied leave
 * @returns {string} returning subject line of mail based on type and status
 */
const createLeaveWFHMailSubject = (type, status, empName, empCode) => {
  const suffix = `${empCode}-${empName}`;

  if (type.includes('wfh')) {

    if (status === 'approved') {
      return `Work-From-Home Approval for ${suffix}`
    } else {
      return `Work-From-Home Request Decline for ${suffix}`;
    }

  } else if (type.includes('extra')) {

    if (status === 'approved') {
      return `Approval for Additional Workday for ${suffix}`
    } else {
      return `Work-From-Home Request Decline for ${suffix}`;
    }

  } else {

    if (status === 'approved') {
      return `Leave Request Approval for ${suffix}`;
    } else {
      return `Leave Request Decline for ${suffix}`;
    }
     
  }
}

/**
 * @description This function is use to send the leave status mail to applier
 * @param {object} leave Intance of leave
 * @param {string} approvedBy name of approvedBy or declinedBy
 * @param {string} comment commet of declined leaves
 */
exports.sendLeaveStatusMail = (leave, approvedBy, comment) => {
 console.log("🚀 ~ file: sendEmail.js:74 ~ leave:", leave)
 
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    ignoreTLS: false,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  })


  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.handlebars',
      layoutsDir: getTemplateDir(leave.type),
      defaultLayout: false,
      express
    },
    viewPath: getTemplateDir(leave.type),
    extName: '.handlebars',
  }))

  var mailOptions = {
    from: process.env.EMAIL,
    to: 'shubhamk@thoughtwin.com', // change this email with user email
    subject: createLeaveWFHMailSubject(leave.type, leave.status, leave.from.fullName, leave.from.empCode),
    template: leave.status,
    context: {
      name: leave.from.fullName, // replace {{name}} with Adebola
      leaveType: leaveType[leave.type], // replace {{leaveType}} with Leave type
      fromDate: `${moment(leave.fromDate).format('DD/MM/YYYY')} ${leave.fromTime}`,
      endDate: `${moment(leave.toDate).format('DD/MM/YYYY')} ${leave.toTime}`,
      appovedBy: approvedBy.fullName,
      reason: comment || ''
    },
    path: `./${Math.random()}.pdf`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  });

}

/**
 * @description This method is used to send timesheet to super admin over the mail.
 * @param {string} email email of super admin
 * @param {string} message message of time sheet 
 * @param {string} attachFile timesheet file
 */
exports.sendTimeSheetMail = (email, message, attachFile) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  })
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    cc:'sourabhl@thoughtwin.com',
    subject: `${message}`,
    text: `${message}`,
    attachments: [
      {
        filename: attachFile.name,
        content: fs.createReadStream(attachFile.path),
      },
    ],
  }
  transporter
    .sendMail(mailOptions)
    .then((info) => {
      fs.unlinkSync(attachFile.path)
    })
    .catch((error) => {
      console.log('Timesheet mail error', error)
    })
    
}
/**
 * @description This method is used to send timesheet to super admin over the mail.
 * @param {string} email email of super admin
 * @param {string} message message of time sheet 
 * @param {string} attachFile payslip file
 */
 exports.sendPayslipMail = (email, message, attachFile) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  })
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    cc:'sourabhl@thoughtwin.com',
    subject: `${message}`,
    text: `${message}`,
    attachments: [
      {
        filename: attachFile.name,
        content: fs.createReadStream(attachFile.path),
      },
    ],
  }
  transporter
    .sendMail(mailOptions)
    .then((info) => {
      fs.unlinkSync(attachFile.path)
    })
    .catch((error) => {
      console.log('Timesheet mail error', error)
    })
    
}
