const Booking = require("../models/Booking");
const Event = require("../models/Event");
const mongoose = require("mongoose");


// 🎟️ BOOK EVENT
exports.bookEvent = async (req, res) => {
  try {

    const userId = req.user.id;
    const eventId = req.params.eventId;

    const eventObjectId = new mongoose.Types.ObjectId(eventId);

    const event = await Event.findById(eventObjectId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // check available seats
    if (event.availableSeats <= 0) {
      return res.status(400).json({
        message: "No seats available",
      });
    }

    // prevent duplicate booking
    const existingBooking = await Booking.findOne({
      user: userId,
      event: eventObjectId,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Event already booked",
      });
    }

    const booking = await Booking.create({
      user: userId,
      event: eventObjectId,
      status: "confirmed",
    });

    // reduce available seats
    event.availableSeats = event.availableSeats - 1;
    await event.save();

    res.status(201).json({
      message: "Event booked successfully",
      booking,
    });

  } catch (error) {

    console.error("BOOK EVENT ERROR:", error);

    res.status(500).json({
      message: "Booking failed",
    });
  }
};



// 📋 GET MY BOOKINGS
exports.myBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id,
    }).populate("event");

    res.json(bookings);

  } catch (error) {

    console.error("MY BOOKINGS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};



// ❌ CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
  try {

    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const event = await Event.findById(booking.event);

    if (event) {
      event.availableSeats += 1;
      await event.save();
    }

    await Booking.findByIdAndDelete(bookingId);

    res.json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {

    console.error("CANCEL BOOKING ERROR:", error);

    res.status(500).json({
      message: "Cancel failed",
    });
  }
};