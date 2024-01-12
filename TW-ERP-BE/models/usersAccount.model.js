const mongoose = require('mongoose')

const userAccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      unique: true,
      required: true,
    },
    salary: {
      type: String,
      required: true,
      default: '',
    },
    pf_status: {
      type: Boolean,
      required: true,
      enum: [true, false],
      default: false,
    },
    pan_no: {
      type: String,
    },
    aadhar_no: {
      type: Number,
    },
    uan_no: {
      type: Number,
    },
    esi_no: {
      type: Number,
    },
    account_no: {
      type: Number,
    },
    bank_name: {
      type: String,
      default: 'Indusind Bank'
    }
  },
  {
    paranoid: true,
    timestamp: true,
  },
)
const UserAccount = mongoose.model('UserAccount', userAccountSchema)
module.exports = { UserAccount }
