const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const server = http.createServer(app);

//socket
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend domain
    methods: ["*"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    console.log("user joined");
    socket.join(room);
  });
  socket.on("send_message", ({ message, room }) => {
    socket.to(room).emit("receive_message", { reply: message });
  });
  // socket.on("send_message", ({ message, room }) => {
  //   socket.broadcast.emit("receive_message", { reply: message });
  // });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON 3001");
});
