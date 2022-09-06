const mongoose = require("mongoose");

const connectDB = async (databasePath) => {
  console.log("db path: ");
  console.log(databasePath);
  try {
    await mongoose.connect(databasePath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(`Cannot connect to db : ${error}.`);
    return;
  }
  console.log(`Connected to database at ${databasePath} successfully.`);
};

const disconnectDB = async (databasePath) => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(`Cannot disconnect to db : ${error}.`);
    return;
  }
  console.log(`Disconnected from database at ${databasePath} successfully.`);
};

module.exports = { connectDB, disconnectDB };
