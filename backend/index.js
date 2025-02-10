const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");
const http = require("http");
const {  setupSocket } = require("./socket");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: false
  },
  transports: ['websocket', 'polling'] 
});

// DB Connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/event-mgmt", {

});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});


app.use(cors());

setupSocket(io);

// Express
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/event", eventRoutes);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// server.listen(3000);
module.exports = { io, server };