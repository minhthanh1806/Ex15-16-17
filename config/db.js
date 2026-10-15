const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/node-mongoose';
    const conn = await mongoose.connect(mongoUri);
    console.log(`Connected successfully to MongoDB: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
};

module.exports = connectDB;
