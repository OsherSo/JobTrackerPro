const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide the company name.'],
      maxlength: [50, 'Company name cannot exceed 50 characters.'],
    },
    position: {
      type: String,
      required: [true, 'Please provide the position.'],
      maxlength: [50, 'Position cannot exceed 50 characters.'],
    },
    status: {
      type: String,
      enum: {
        values: ['interview', 'declined', 'pending'],
        message:
          'Invalid status. Please choose either "interview", "declined", or "pending".',
      },
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: {
        values: ['full-time', 'part-time', 'remote', 'internship'],
        message:
          'Invalid job type. Please choose either "full-time", "part-time", "remote", or "internship".',
      },
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: '',
      required: [true, 'Please provide the job location.'],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the user.'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
