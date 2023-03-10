const monogoose = require("mongoose");
const dotnev = require("dotenv");

// Load Config
dotnev.config({ path: "./config.env" });
const connectDB = async () => {
  try {
    const conn = await monogoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;