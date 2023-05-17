const { StatusCodes } = require('http-status-codes');

const Job = require('../models/Job');
const checkPermissions = require('../utils/checkPermissions');

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

exports.deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  checkPermissions(req.user, job.createdBy);

  await job.deleteOne();

  res.status(StatusCodes.NO_CONTENT).json({ msg: 'Success! Job removed' });
};

exports.updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  checkPermissions(req.user, job.createdBy);

  const { position, company, jobLocation, status, jobType } = req.body;
  job.position = position;
  job.company = company;
  job.jobLocation = jobLocation;
  job.status = status;
  job.jobType = jobType;
  await job.save();

  res.status(StatusCodes.OK).json({ job });
};

exports.showStats = (req, res) => {
  res.send('Show Stats');
};
