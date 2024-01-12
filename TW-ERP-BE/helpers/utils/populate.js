const { Roles, Users } = require("../../models");

exports.populates = async (query, path, model) => {
  let data = await query.populate({
    path: `${path}`,
    model: `${model}`,
    select: ["-password", "-__v"],
  });
  return data;
};

exports.aggregates = (match) => [
  {
    $lookup: {
      from: Users.collection.name,
      localField: "from",
      foreignField: "_id",
      as: "users",
    },
  },
  { $unwind: "$users" },
  {
    $lookup: {
      from: Roles.collection.name,
      localField: "users.role",
      foreignField: "role_slug",
      as: "role",
    },
  },
  { $unwind: "$role" },
  {
    $unset: ["users.password", "users._id", "role._id"],
  },
  match,{ $sort : { createdAt : -1 } }
];
