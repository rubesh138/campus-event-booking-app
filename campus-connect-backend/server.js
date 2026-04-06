const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// 🔗 MongoDB connection (FINAL FIX)
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("❌ MongoDB CONNECTION ERROR:", error);
    process.exit(1);
  }
};

connectDB();

// 🔐 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("Campus Connect Backend Running");
});

// 🚀 Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});