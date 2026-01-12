const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); // 🔐 bcrypt added
require("dotenv").config();

const app = express();
const authMiddleware = require("./middleware/auth");
const rateLimit = require("express-rate-limit");
//const cleanContent = DOMPurify.sanitize(content);
const helmet = require("helmet");


// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Models
const User = require("./models/user");
const Note = require("./models/Note");


// ===================
// USER ROUTES
// ===================

app.use(helmet());


// REGISTER (FIXED)
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: "Username already exists" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// 🔐 Login rate limiter (Brute Force protection)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 attempts per IP
  message: {
    success: false,
    message: "Too many login attempts. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// LOGIN (FIXED)
const jwt = require("jsonwebtoken");

app.post("/login", loginLimiter, async (req, res) => {

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // 🔐 CREATE JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,              // ✅ SEND TOKEN
      username: user.username
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// ===================
// NOTES ROUTES (still vulnerable to IDOR intentionally)
// ===================

// GET NOTES
app.get("/notes", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json([]);
  }
});


// ADD NOTE
app.post("/notes", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    const note = new Note({
      content,
      user: req.user.userId
    });

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE NOTE
app.delete("/notes/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await note.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// UPDATE NOTE
app.put("/notes/:id", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    note.content = content;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ===================
// START SERVER
// ===================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
