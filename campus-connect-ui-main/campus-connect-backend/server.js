const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 🔐 Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// 🎉 Events routes
app.use("/api/events", require("./routes/eventRoutes"));

// 🎟️ Booking routes  ✅ REQUIRED FOR USER EVENT BOOKING
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Campus Connect Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
