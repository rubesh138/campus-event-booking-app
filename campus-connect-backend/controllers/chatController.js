const Event = require("../models/Event");
const Booking = require("../models/Booking");

exports.chatbot = async (req, res) => {
  try {

    const message = req.body.message?.toLowerCase() || "";

    // 🔹 NEXT EVENT
    if (message.includes("next")) {

      const event = await Event.findOne().sort({ date: 1 });

      if (!event) {
        return res.json({ reply: "No upcoming events." });
      }

      return res.json({
        reply: `${event.title}
📅 ${new Date(event.date).toLocaleDateString()}
📍 ${event.location}
🎟 Seats: ${event.availableSeats}/${event.totalSeats}`
      });
    }


    // 🔹 TECH EVENTS
    if (message.includes("tech")) {

      const events = await Event.find({ category: "Technology" });

      if (!events.length) {
        return res.json({
          reply: "No technology events available."
        });
      }

      const reply = events.map(e =>
        `${e.title}
📅 ${new Date(e.date).toLocaleDateString()}
📍 ${e.location}`
      ).join("\n\n");

      return res.json({ reply });
    }


    // 🔹 EVENTS THIS WEEK
    if (message.includes("week")) {

      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const events = await Event.find({
        date: { $gte: today, $lte: nextWeek }
      });

      if (!events.length) {
        return res.json({
          reply: "No events happening this week."
        });
      }

      const reply = events.map(e =>
        `${e.title}
📅 ${new Date(e.date).toLocaleDateString()}
📍 ${e.location}`
      ).join("\n\n");

      return res.json({ reply });
    }


    // 🔹 MY BOOKINGS (FIXED ✅)
    if (message.includes("booking")) {

      const userId = req.user?.id;

      console.log("USER:", req.user); // debug
      console.log("USER ID:", userId);

      if (!userId) {
        return res.json({
          reply: "Please login to view your bookings."
        });
      }

      const bookings = await Booking
        .find({ user: userId })
        .populate("event");

      console.log("BOOKINGS:", bookings); // debug

      if (!bookings.length) {
        return res.json({
          reply: "You have no bookings."
        });
      }

      // ✅ SAFE HANDLING (NO CRASH)
      const reply = bookings.map(b => {
        if (!b.event) {
          return "⚠️ Event data missing";
        }

        return `${b.event.title}
📅 ${new Date(b.event.date).toLocaleDateString()}
📍 ${b.event.location}`;
      }).join("\n\n");

      return res.json({ reply });
    }


    // 🔹 DEFAULT RESPONSE
    res.json({
      reply: "Ask me about next event, tech events, this week events, or your bookings."
    });

  } catch (error) {

    console.error("CHATBOT ERROR:", error);

    res.json({
      reply: "Unable to fetch data."
    });
  }
};