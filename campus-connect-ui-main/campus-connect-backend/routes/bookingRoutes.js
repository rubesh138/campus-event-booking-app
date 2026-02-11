const express = require("express");
const router = express.Router();
const { bookEvent, myBookings } = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware");

router.post("/:eventId", auth, bookEvent);
router.get("/me", auth, myBookings);

module.exports = router;
