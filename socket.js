import { Server } from "socket.io";
import { server } from "./app.js";

export const io = new Server(server);
