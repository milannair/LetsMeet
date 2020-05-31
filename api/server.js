
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
const clients = {}; // map userId to socket id

module.exports = {
  io: io,
  clients: clients,
  server: server // for tests
};

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

// SOCKET.IO
const User = require('./server/models/userModel');

io.on('connection', (socket) => {
  socket.on('user authenticated', (userId) => {
    console.log('user authenticated: ' + userId);
    socket.userId = userId;
    clients[userId] = socket.id;

    User.findById(userId, {groups: 1}, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        if (data) {
          data.groups.forEach((groupId) => {
            socket.join(groupId);
          });
        } else {
          console.error(err);
        }
      }
    });
  });

  socket.on('disconnect', () => {
    delete clients[socket.userId];
  });
});

