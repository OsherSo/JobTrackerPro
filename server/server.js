const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config();

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
