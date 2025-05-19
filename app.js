const express = require("express");
const app = express();
const router = require("./src/routes/api");

// Security Middleware Import
const cors = require("cors");
const rateLimit = require("express-rate-limit");
// const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

// Security Middleware Implementation
app.use(cors())
// app.use(rateLimit())
app.use(helmet())
app.use(hpp())
// app.use(mongoSanitize())
app.use(cookieParser())

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))



// Request Rate Limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	// limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	// standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	// legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// // // Apply the rate limiting middleware to all requests.
// app.use(limiter)



// Connect DB
// const URI = "mongodb://127.0.0.1:27017/EcommercMERN";
const URI = "mongodb+srv://cluster0.tu9cngr.mongodb.net/EcommercMERN";

// const URI = "mongodb://194.233.71.52:27017/EcommercMERN?authSource=admin";

const options = {
  user: "nsakib", // No Need for 194.233.71.52:27017
  pass: "nsakib123", // No Need for 194.233.71.52:27017
  autoIndex: true,
};
const connectDB = async () => {
  try {
    await mongoose.connect(URI, options)
    console.log("Database Connected Successfully")
  } catch (error) {
    console.log("Database Connection Failed")
    // console.error(error);

  }
};
connectDB()




app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", router);


// app.use(express.static('client/dist'))
// React Frontend Routing
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });

// console.log((path.resolve(__dirname, "client", "dist", "index.html")))

module.exports = app;
