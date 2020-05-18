// Import express
const express = require("express");
// Import Body parser
const bodyParser = require("body-parser");
// Import Mongoose
const mongoose = require("mongoose");

const dotenv = require("dotenv");
// Initialise the app
const app = express();

var cors = require("cors");

// Import routes
let apiRoutes = require("./server/api-routes");
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
dotenv.config();

// Connect to Mongoose Cluster and set connection variable
mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PW +
    "@cluster0-kdglj.mongodb.net/LetsMeet?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// //Connect to MongoDB Local Instance
// mongoose.connect("mongodb://localhost/LetsMeet", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("DB connected");

// Setup server port
var port = process.env.PORT || 8000;

// Send message for default URL
// TODO: only allow cors from specific origin
app.get("/", cors(), (req, res) => res.send("LetsMeet API"));

// Use Api routes in the App
app.use("/lm", cors(), apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running LetsMeet API @ localhost:" + port);
});
