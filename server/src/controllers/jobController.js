const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

exports.createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

exports.deleteJob = (req, res) => {
  res.send('Delete Job');
};

exports.updateJob = (req, res) => {
  res.send('Update Job');
};

exports.showStats = (req, res) => {
  res.send('Show Stats');
};
