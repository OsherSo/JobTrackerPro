const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const attachCookie = require('../utils/attachCookie');
const { UnauthenticatedError } = require('../errors');

exports.register = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.create({ name, email, password, passwordConfirm });

  const token = user.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  user.password = undefined;

  const token = user.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
};

exports.updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.userId,
    { email, name, lastName, location },
    { new: true, runValidators: true }
  );

  const token = user.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
};

exports.getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
};
