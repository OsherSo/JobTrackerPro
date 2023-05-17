const fs = require('fs');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const Job = require('./src/models/Job');

const start = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  await Job.deleteMany();

  const jsonData = fs.readFileSync('./mock-data.json', 'utf8');
  const data = JSON.parse(jsonData);
  await Job.create(data);
  console.log('Success!!!!');
  process.exit(0);
};

start();
