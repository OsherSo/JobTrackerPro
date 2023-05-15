const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { BadRequestError } = require('../errors');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide all values');
  // }

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};

exports.login = (req, res, next) => {
  res.send('Login');
};

exports.updateUser = (req, res, next) => {
  res.send('Update User');
};
