// main.ts at project root
import { serveDir, serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";

const PORT = Number(Deno.env.get("PORT")) || 3000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  let pathname = url.pathname;

  // Normalize trailing slash (except for root)
  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  console.log(`Requested path: ${pathname}`);

  // Serve favicon if requested
  if (pathname === "/favicon.ico") {
    try {
      return await serveFile(req, "./dist/favicon.ico");
    } catch {
      console.log("Favicon not found");
    }
  }

  // Serve static files from ./dist
  try {
    const response = await serveDir(req, {
      fsRoot: "./dist",
      urlRoot: "",
      showDirListing: false,
      enableCors: true,
      quiet: true,
    });

    console.log(`serveDir status: ${response.status}`);
    if (response.status !== 404) {
      return response;
    } else {
      console.log("File not found in serveDir, falling back to index.html");
    }
  } catch (err) {
    console.error("serveDir error:", err);
  }

  // SPA fallback: serve index.html for unknown paths
  console.log("Serving SPA fallback: ./dist/index.html");
  return await serveFile(req, "./dist/index.html");
}

// Start the server
Deno.serve({ port: PORT }, handler);
