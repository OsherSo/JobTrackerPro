const User = require('../models/User');

exports.register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
};

exports.login = (req, res, next) => {
  res.send('Login');
};

exports.updateUser = (req, res, next) => {
  res.send('Update User');
};
