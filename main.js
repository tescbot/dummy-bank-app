import { app, server } from "./express.js";
import "./socket.js";

import { loadRoutes } from "./handlers/routes.js";
import { loadSockets } from "./handlers/sockets.js";
import { getLocalIp } from "./handlers/ip.js";

// Run handlers
loadRoutes(app, "./routes");
loadSockets("./sockets");

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(
    `Listening on:\nhttp://localhost:${PORT}/\nhttp://${getLocalIp()}:${PORT}`
  );
});
