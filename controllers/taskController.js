const { StatusCodes } = require('http-status-codes');

const Task = require('../models/Task');
const checkPermissions = require('../utils/checkPermissions');

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ tasks });
};

exports.createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  checkPermissions(req.user, task.createdBy);

  await task.deleteOne();

  res.status(StatusCodes.NO_CONTENT).json({ msg: 'Success! Task removed' });
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  checkPermissions(req.user, task.createdBy);

  const { name, completed } = req.body;
  if (name) task.name = name;
  if (completed !== undefined) task.completed = completed;

  await task.save();

  res.status(StatusCodes.OK).json({ task });
};

exports.getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  checkPermissions(req.user, task.createdBy);

  res.status(StatusCodes.OK).json({ task });
};
