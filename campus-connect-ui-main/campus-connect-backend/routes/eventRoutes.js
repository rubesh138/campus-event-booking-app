const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/:id", getEventById);      // ✅ REQUIRED
router.post("/", createEvent);
router.delete("/:id", deleteEvent);    // ✅ REQUIRED

module.exports = router;
