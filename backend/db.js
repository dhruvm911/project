const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Could not connect to MongoDB:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = connectDB;
