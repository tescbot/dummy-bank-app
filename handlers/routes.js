import fs from "fs";
import path from "path";
import url from "url";

/**
 * Loads all the routes to the app.
 *
 * @param {import("express").Express} app
 * @param {string} routeFolder
 */
export async function loadRoutes(app, routeFolder) {
  for (const name of fs.readdirSync(routeFolder)) {
    const itemPath = path.join(routeFolder, name);

    if (fs.statSync(itemPath).isDirectory()) {
      loadRoutes(app, itemPath);
    }

    if (itemPath.endsWith(".js")) {
      const fileUrl = url.pathToFileURL(itemPath);
      const module = await import(fileUrl);

      if (module.router === undefined || module.path === undefined) {
        console.error(
          `Could not load router "${itemPath}". Make sure both router and path are exported in the router.`
        );
        continue;
      }

      app.use(module.path, module.router);
    }
  }
}
