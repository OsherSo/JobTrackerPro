const moment = require('moment');
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

const Job = require('../models/Job');
const checkPermissions = require('../utils/checkPermissions');

exports.getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  if (status !== 'all') {
    queryObject.status = status;
  }
  if (jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  let result = Job.find(queryObject);

  const sortOptions = {
    latest: (result) => result.sort('-createdAt'),
    oldest: (result) => result.sort('createdAt'),
    'a-z': (result) => result.sort('position'),
    'z-a': (result) => result.sort('-position'),
  };
  result = sortOptions[sort](result);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
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

exports.showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

exports.getLocationPredictions = async (req, res) => {
  const { jobLocation } = req.params;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${jobLocation}&key=${process.env.GOOGLE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(StatusCodes.OK).json({
    predictions: data.predictions.map((prediction) => prediction.description),
  });
};
