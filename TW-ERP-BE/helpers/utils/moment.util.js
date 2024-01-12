const moment = require('moment')

class Formate {
  currentTime = () => {
    return moment().format()
  }
  time = (time) => {
    return moment(time)
  }
  startTime = () => {
    return moment()
  }
  endTime = (day) => {
    return moment(day, 'days')
  }
  duration = (startTime, endTime) => {
    return moment.duration(endTime.diff(startTime))
  }
  dateFormate = (formate) => {
    return moment().format(formate)
  }
  startdateFormate = (formate) => {
    return moment().format(formate)
  }
  dateFormateFrom = (date, formate) => {
    return moment(date).format(formate)
  }
  fromDate = (date) => {
    return moment(date).toDate()
  }
  validateDate = (date) => {
    let fromDate = moment(date).format('l')
    return !moment(fromDate).isSameOrAfter(moment().day(-7).format('l'), 'day')
  }
}

module.exports = new Formate()
