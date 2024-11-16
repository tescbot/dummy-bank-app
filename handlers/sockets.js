import fs from "fs";
import path from "path";
import url from "url";

/**
 * Loads all the socket events.
 *
 * @param {string} folder
 */
export async function loadSockets(folder) {
  for (const name of fs.readdirSync(folder)) {
    const itemPath = path.join(folder, name);

    if (fs.statSync(itemPath).isDirectory()) {
      loadSockets(app, itemPath);
    }

    if (itemPath.endsWith(".js")) {
      const fileUrl = url.pathToFileURL(itemPath);
      await import(fileUrl);
    }
  }
}
