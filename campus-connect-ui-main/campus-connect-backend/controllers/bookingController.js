const Booking = require("../models/Booking");
const Event = require("../models/Event");

// 🎟️ BOOK EVENT
exports.bookEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.seats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    // prevent duplicate booking
    const alreadyBooked = await Booking.findOne({
      user: userId,
      event: eventId,
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: "Already booked" });
    }

    const booking = await Booking.create({
      user: userId,
      event: eventId,
    });

    event.seats -= 1;
    await event.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error("BOOK EVENT ERROR:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};

// 📋 MY BOOKINGS
exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("event");

    res.json(bookings);
  } catch (err) {
    console.error("MY BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
