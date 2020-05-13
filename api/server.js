// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");
// Initialise the app
let app = express();

var cors = require('cors')

// Import routes
let apiRoutes = require("./server/api-routes");
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect("mongodb://localhost/LetsMeet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
