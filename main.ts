// main.ts
import { serveDir, serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  // Try serving static files
  const res = await serveDir(req, {
    fsRoot: "dist",
    urlRoot: "",
    showDirListing: false,
    enableCors: true,
  });

  // If file wasn't found, serve index.html for SPA routing
  if (res.status === 404) {
    return serveFile(req, "./dist/index.html");
  }

  return res;
});
