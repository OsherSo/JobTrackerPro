require('express-async-errors');
const express = require('express');

const authRouter = require('./routes/authRoutes');
const jobRouter = require('./routes/jobRoutes');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
