const mongoose = require('mongoose')

const { cc } = require('../helpers')

const leaveSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    to: {
      type: [String],
      required: true,
    },
    cc: {
      type: [String],
      default: cc,
    },
    description: {
      type: String,
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    fromTime: {
      type: String,
      required: true,
    },
    toTime: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'fullDay',
        'firstHalf',
        'secondHalf',
        'wfhFullDay',
        'wfhSecondHalf',
        'wfhFirstHalf',
        'earlyGoing',
        'extraFullDay',
        'extraSecondHalf',
        'extraFirstHalf',
      ],
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending',
    },
    approvedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        // unique: true,
      },
    ],
    days: {
      type: Number,
      required: true,
    },
    hours: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)
const Leaves = mongoose.model('Leaves', leaveSchema)

exports.Leaves = Leaves
