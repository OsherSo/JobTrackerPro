const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/User');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(payload.userId);
  if (!user) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  req.user = { userId: payload.userId };

  next();
};

module.exports = auth;
