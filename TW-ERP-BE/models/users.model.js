const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    empCode: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile_image: {
      type: String,
    },
    leavesTaken: {
      type: Number,
      default: 0,
    },
    allocatedLeaves: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      private: true,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: mongoose.Schema.Types.Number,
    },
    salary_password: {
      type: String,
    },
    status: {
      type: String,
      default: 'active',
    },
    previousMonthLeaves: {
      type: Number,
      default: 0,
    },
    previousMonth: {
      type: String,
    },
  },
  { paranoid: true, timestamps: true },
)

userSchema.virtual('user_role', {
  ref: 'Roles',
  localField: 'role',
  foreignField: 'role_slug',
  justOne: true,
})

userSchema.virtual('user_account', {
  ref: 'UserAccount',
  localField: '_id',
  foreignField: 'user',
  justOne: true,
})

userSchema.virtual('imageUrl').get(function () {
  return `${process.env.BACKEND_PORT}/user/profiles/` + this.profile_image
})

userSchema.set('toJSON', { getters: true, virtuals: true })
const Users = mongoose.model('Users', userSchema)

exports.Users = Users
