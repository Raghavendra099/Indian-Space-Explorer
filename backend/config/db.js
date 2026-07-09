const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/indian-space-explorer';
  if (!uri) {
    throw new Error('MONGODB_URI must be defined in environment variables.');
  }

  await mongoose.connect(uri);
  console.log(`✅ Connected to MongoDB at ${uri}`);
};

module.exports = connectDB;
