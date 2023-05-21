const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const attachCookie = require('../utils/attachCookie');
const { UnauthenticatedError } = require('../errors');

// exports.register = async (req, res) => {
//   const { name, email, password, passwordConfirm } = req.body;

//   const user = await User.create({ name, email, password, passwordConfirm });

//   const token = user.createJWT();

//   attachCookie({ res, token });

//   res.status(StatusCodes.CREATED).json({
//     user: {
//       name: user.name,
//       lastName: user.lastName,
//       email: user.email,
//       location: user.location,
//     },
//   });
// };

exports.register = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    verificationToken,
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'user created',
    verificationToken,
  });
};

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email }).select('+password');
//   if (!user || !(await user.comparePassword(password))) {
//     throw new UnauthenticatedError('Invalid Credentials');
//   }
//   user.password = undefined;

//   const token = user.createJWT();

//   attachCookie({ res, token });

//   res.status(StatusCodes.OK).json({
//     user,
//     location: user.location,
//   });
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  if (!user.isVerified) {
    throw new UnauthenticatedError('Please verify your email');
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

exports.logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

exports.verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOneAndUpdate(
    { email, verificationToken },
    {
      isVerified: true,
      verificationToken: undefined,
      verified: Date.now(),
    },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  res.status(StatusCodes.OK).json({ msg: 'user verified' });
};
