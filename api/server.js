// Import express
const express = require("express");
// Import Body parser
const bodyParser = require("body-parser");
// Import Mongoose
const mongoose = require("mongoose");

const dotenv = require("dotenv");
// Initialise the app
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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

let dbUri;
if (process.env.USE_LOCAL_DB === 'true') {
  console.log("Connecting to local MongoDB database");
  dbUri = "mongodb://localhost/LetsMeet";
} else {
  console.log("Connecting to MongoDB Cluster");
  dbUri = "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PW +
    "@cluster0-kdglj.mongodb.net/LetsMeet?retryWrites=true&w=majority";
}

// Connect to the selected Mongoose instance and set connection variable
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
server.listen(port, function () {
  console.log("Running LetsMeet API @ localhost:" + port);
});

const eventHandler = require('./server-socket');
eventHandler.dbEvents(io);

io.on('connection', (socket) => {
  console.log('connection')
  eventHandler.socketEvents(socket);
});
