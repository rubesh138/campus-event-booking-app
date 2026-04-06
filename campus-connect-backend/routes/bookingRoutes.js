const express = require("express");
const router = express.Router();

const {
  bookEvent,
  myBookings,
  cancelBooking
} = require("../controllers/bookingController");

const auth = require("../middleware/authMiddleware");

// ✅ FIXED ROUTE (THIS IS THE MAIN CHANGE)
router.post("/:eventId", auth, bookEvent);

// ✅ get my bookings
router.get("/me", auth, myBookings);

// ✅ cancel booking
router.delete("/:id", auth, cancelBooking);

module.exports = router;

