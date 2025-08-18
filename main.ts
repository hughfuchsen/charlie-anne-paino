import { serveDir, serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const res = await serveDir(req, {
    fsRoot: "dist",
    urlRoot: "",
    showDirListing: false,
    enableCors: true,
  });

  // If it's a 404, serve index.html (React SPA fallback)
  if (res.status === 404) {
    return await serveFile(req, "dist/index.html");
  }

  return res;
});
