import "dotenv/config"; // Extract env, before importing other stuff.
import chalk from "chalk";

import { app, server } from "./express.js";
import { dbConnect } from "./db.js";
import "./socket.js";

import { loadRoutes } from "./handlers/routes.js";
import { loadSockets } from "./handlers/sockets.js";
import { getLocalIp } from "./middleware/ip.js";

// Run handlers
dbConnect(process.env.MONGO_URI);
loadRoutes(app, "./routes");
loadSockets("./sockets");

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(
    "Listening on:\n" +
      `${chalk.blue("LOCAL:")} http://localhost:${PORT}/\n` +
      `${chalk.green("PUBLIC:")} http://${getLocalIp()}:${PORT}`
  );
});
