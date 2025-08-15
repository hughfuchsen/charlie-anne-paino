// main.ts
import { serveDir, serveFile } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  const url = new URL(req.url);

  // Always serve index.html for root and SPA routes
  if (url.pathname === "/" || !url.pathname.includes(".")) {
    return serveFile(req, "./dist/index.html");
  }

  // Otherwise, try serving static files from dist
  return serveDir(req, {
    fsRoot: "dist",
    urlRoot: "",
    showDirListing: false,
    enableCors: true,
  });
});
