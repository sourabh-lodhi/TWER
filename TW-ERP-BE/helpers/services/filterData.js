const { Leaves } = require("../../models");
const { aggregates } = require("../utils/populate");
// const { aggregates } = require("../utils");

exports.filter = async ({
  status,
  search,
  email,
  startDate,
  endDate,
  from,
  id,
  to,
  userId
}) => {
  let newfilter = {};

  if (from) {
    const srchFrom = { from: from };
    newfilter = { ...newfilter, ...srchFrom };
  }
  if (to) {
    const srchFrom = { to: to };
    newfilter = { ...newfilter, ...srchFrom };
  }
  if(userId){
    const srch = {
      from:{ $ne : userId },
    };
    newfilter = { ...newfilter, ...srch };
  }
  if (search) {
    const srch = {
      $or: [
        { "users.fullName": { $in: [new RegExp(`${search}`, "i")] } },
        { "users.email": { $in: [new RegExp(`${search}`, "i")] } },
      ],
    };
    newfilter = { ...newfilter, ...srch };
  }
  if (status || (startDate && endDate)) {
    let fltr = {};
    if (startDate && endDate) {
      fltr = {
        ...fltr,
        fromDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    }
    if (status) {
      fltr = { ...fltr, status: status };
    }
    newfilter = { ...fltr, ...newfilter };
  }
  const match = { $match: { $and: [newfilter] } };
  const findLeaves = await Leaves.aggregate(aggregates(match));
  const pending = findLeaves.filter((item) => item.status === "pending");
  const approved = findLeaves.filter((item) => item.status === "approved");
  const rejected = findLeaves.filter((item) => item.status === "rejected");
  const earlyGoing = findLeaves.filter((item) => item.type === "earlyGoing");
  const result = {
    allLeaves: findLeaves,
    pending,
    approved,
    rejected,
    earlyGoing,
  };
  return result;

};
