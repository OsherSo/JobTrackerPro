const express = require('express');

const notFound = require('./middleware/notFound');
const authRouter = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
