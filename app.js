const express = require("express");
const app = express();
const router = require("./src/routes/api");

// Security Middleware Import
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Security Middleware Implementation
// app.use(cors())
// app.use(rateLimit())
// app.use(helmet())
// app.use(hpp())
// app.use(mongoSanitize())
app.use(cookieParser())
app.use(express.json())


// Request Rate Limiting
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
// 	// store: ... , // Redis, Memcached, etc. See below.
// })

// // Apply the rate limiting middleware to all requests.
// app.use(limiter)

// Connect DB
// const URI = "mongodb://127.0.0.1:27017/EcommercMERN";
const URI = "mongodb+srv://cluster0.tu9cngr.mongodb.net/EcommercMERN";
const options = {
  user: "nsakib",
  pass: "nsakib123",
  autoIndex: true
};
const connectDB = async () => {
  try {
    await mongoose.connect(URI, options)
    console.log("Database Connected Successfully")
  } catch (error) {
    console.log("Database Connection Failed")

  }
};
connectDB()

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", router);

module.exports = app;
