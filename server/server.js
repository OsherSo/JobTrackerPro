const dotenv = require('dotenv');
const express = require('express');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
