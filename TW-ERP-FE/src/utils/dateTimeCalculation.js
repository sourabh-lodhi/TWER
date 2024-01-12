import moment from 'moment';

import { earlyGoing, extraFullDay, fullDay, wfhFullDay } from './appConstant';

function getNumberOfWeekDays(start, end, dayNum) {
  dayNum = dayNum || 0;
  var daysInInterval = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
  );
  var toNextTargetDay = (7 + dayNum - start.getDay()) % 7;
  var daysFromFirstTargetDay = Math.max(daysInInterval - toNextTargetDay, 0);
  return Math.ceil(daysFromFirstTargetDay / 7);
}

export const dateTimeCalculation = (type, from, to) => {
  if (type === earlyGoing) {
    let startTime = moment(from);
    let endTime = moment(to);
    let duration = moment.duration(endTime.diff(startTime));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) - hours * 60;
    const result = `0${hours}h ${minutes}m`;
    return result;
  } else if (type === fullDay || type === wfhFullDay || type === extraFullDay) {
    let result;
    if (from && to) {
      let fromDate = moment(from);
      let ToDate = moment(to);
      const total =
        ToDate.diff(fromDate, 'days') +
        1 -
        getNumberOfWeekDays(new Date(from), new Date(to));
      result = `${total} days`;
    } else {
      result = `1 day`;
    }
    return result;
  } else {
    return '0.5 day';
  }
};

export const yearCalculation = () => {
  const yearCalculate = moment().year();
  let calculateDiff = yearCalculate - 10;
  const finalYearArray = [];
  for (let counter = yearCalculate; counter >= calculateDiff; counter--) {
    finalYearArray.push(counter);
  }
  return finalYearArray;
};
