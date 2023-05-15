const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: 'Something went wrong, try again later',
  };

  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = err.message;
  }

  res.status(defaultError.statusCode).json({ msg: err });
  // res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

module.exports = errorHandler;
