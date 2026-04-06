const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

// NEW ROUTE → get total users count
router.get("/count", authController.getUserCount);

module.exports = router;