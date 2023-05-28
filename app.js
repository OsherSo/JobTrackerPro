require('express-async-errors');

const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const jobRouter = require('./routes/jobRoutes');
const taskRouter = require('./routes/taskRoutes');
const authRouter = require('./routes/authRoutes');

const notFound = require('./middleware/notFound');
const authenticateUser = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/tasks', authenticateUser, taskRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
