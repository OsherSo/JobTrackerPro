require('express-async-errors');
const morgan = require('morgan');
const express = require('express');

const jobRouter = require('./routes/jobRoutes');
const authRouter = require('./routes/authRoutes');

const notFound = require('./middleware/notFound');
const authenticateUser = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
