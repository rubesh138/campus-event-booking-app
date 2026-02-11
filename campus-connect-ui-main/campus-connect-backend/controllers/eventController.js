const Event = require("../models/Event");

// GET all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// GET single event by ID ✅ FIX
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

// CREATE event
exports.createEvent = async (req, res) => {
  try {
    const { title, category, date, time, location, seats, image } = req.body;

    if (!title || !category || !date || !time || !location || !seats) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const event = await Event.create({
      title,
      category,
      date,
      time,
      location,
      seats,
      image,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to create event" });
  }
};

// DELETE event ✅ FIX
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event" });
  }
};
