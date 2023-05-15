const http = require('http');
const dotenv = require('dotenv');

const connectDB = require('./db/connect');
const app = require('./app');

dotenv.config();

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
