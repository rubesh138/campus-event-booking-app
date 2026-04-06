const Event = require("../models/Event");
const Booking = require("../models/Booking");


// GET ALL EVENTS
exports.getEvents = async (req, res) => {
  try {

    const events = await Event.find();

    const eventsWithRegistrations = await Promise.all(
      events.map(async (event) => {

        const registrations = await Booking.countDocuments({
          event: event._id
        });

        return {
          _id: event._id,
          title: event.title,
          description: event.description,
          category: event.category,
          date: event.date,
          time: event.time,
          location: event.location,
          totalSeats: event.totalSeats,
          availableSeats: event.availableSeats,
          image: event.image,
          registrations
        };

      })
    );

    res.json(eventsWithRegistrations);

  } catch (error) {

    console.error("GET EVENTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch events"
    });

  }
};



// GET EVENT BY ID
exports.getEventById = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const registrations = await Booking.countDocuments({
      event: event._id
    });

    res.json({
      _id: event._id,
      title: event.title,
      description: event.description,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      totalSeats: event.totalSeats,
      availableSeats: event.availableSeats,
      image: event.image,
      registrations
    });

  } catch (error) {

    console.error("GET EVENT ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch event"
    });

  }
};



// CREATE EVENT
exports.createEvent = async (req, res) => {
  try {

    const {
      title,
      description,
      category,
      date,
      time,
      location,
      seats,
      image
    } = req.body;

    if (!title || !category || !date || !time || !location || !seats) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      location,
      totalSeats: seats,
      availableSeats: seats,
      image: image || "https://via.placeholder.com/600x400"
    });

    res.status(201).json({
      message: "Event created successfully",
      event: {
        _id: event._id,
        title: event.title,
        description: event.description,
        category: event.category,
        date: event.date,
        time: event.time,
        location: event.location,
        totalSeats: event.totalSeats,
        availableSeats: event.availableSeats,
        image: event.image
      }
    });

  } catch (error) {

    console.error("CREATE EVENT ERROR:", error);

    res.status(500).json({
      message: "Failed to create event",
      error: error.message
    });

  }
};



// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      message: "Event deleted successfully"
    });

  } catch (error) {

    console.error("DELETE EVENT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete event"
    });

  }
};