const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { BadRequestError } = require('../errors');

exports.register = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  const user = await User.create({ name, email, password, passwordConfirm });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

exports.login = (req, res, next) => {
  res.send('Login');
};

exports.updateUser = (req, res, next) => {
  res.send('Update User');
};
