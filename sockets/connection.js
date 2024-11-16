import { io } from "../socket.js";

io.on("connection", (socket) => {
  console.log(`${socket.id} has connected.`);

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} has disconnected. reason: ${reason}`);
  });
});
