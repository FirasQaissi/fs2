const mongoose = require('mongoose');

async function connectToDatabase(uri) {
  await mongoose.connect(uri, { autoIndex: true });
  return mongoose.connection;
}

module.exports = { connectToDatabase };


