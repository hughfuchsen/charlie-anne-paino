// main.ts
import { serveDir, serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Try serving static files first
  try {
    return await serveDir(req, {
      fsRoot: "dist",
      urlRoot: "",
      showDirListing: false,
      enableCors: true,
    });
  } catch {
    // If not found, always return index.html (SPA fallback)
    return serveFile(req, "./dist/index.html");
  }
});
