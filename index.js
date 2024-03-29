const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

//socket
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
    io.to("admin_room").emit("user_joined", `${room} room joined successfully`);
  });

  socket.on("send_message", ({ message, room }) => {
    socket.to(room).emit("receive_message", { reply: message });
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON 3001");
});
