const mongoose = require("mongoose");

const connectDB = async (databasePath) => {
  try {
    await mongoose.connect(databasePath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(`Cannot connect to db : ${error}.`);
    return;
  }
  console.log(`Connected to database successfully.`);
};

const disconnectDB = async (databasePath) => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(`Cannot disconnect to db : ${error}.`);
    return;
  }
  console.log(`Disconnected from database successfully.`);
};

module.exports = { connectDB, disconnectDB };
