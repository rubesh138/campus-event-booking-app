const express = require("express");
const router = express.Router();
const { chatbot } = require("../controllers/chatController");
const auth = require("../middleware/authMiddleware"); // ✅ ADD THIS

// ✅ ADD auth middleware here
router.post("/", auth, chatbot);

module.exports = router;