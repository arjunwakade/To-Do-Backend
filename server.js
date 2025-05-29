require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
require("./config/passportConfig"); // <-- Add this line

// Check if .env file exists
console.log("ENV FILE EXISTS?", fs.existsSync('.env'));

console.log("MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

const app = express();

// Add Helmet middleware for security headers
app.use(helmet());

// Add rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Add mongo-sanitize middleware to prevent NoSQL injection
app.use(mongoSanitize());

app.use(cors({
  origin: 'https://to-do-frontend-jwdu.onrender.com',
  credentials: true
}));
app.use(express.json());

// --- OAUTH SESSION/PASSPORT MIDDLEWARE ---
app.use(session({
  secret: process.env.SESSION_SECRET || "to-do-secret-key", // Use env if available
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// -----------------------------------------

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error("MongoDB connection failed:", err));

const todoRoutes = require('./routes/ToDoRoutes');
app.use('/api/todos', todoRoutes);

// Add auth routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
