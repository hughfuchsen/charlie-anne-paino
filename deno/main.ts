// deno/main.ts
import { serveDir, serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";

const PORT = Number(Deno.env.get("PORT")) || 3000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  console.log(`Request for: ${pathname}`); // log the incoming path

  // Serve favicon if requested
  if (pathname === "/favicon.ico") {
    const faviconPath = "../dist/favicon.ico";
    console.log(`Trying favicon at: ${faviconPath}`);
    try {
      return await serveFile(req, faviconPath);
    } catch {
      console.log("Favicon not found");
    }
  }

  // Serve static files from ../dist
  try {
    const response = await serveDir(req, {
      fsRoot: "../dist",
      urlRoot: "",
      showDirListing: false,
      enableCors: true,
      quiet: true,
    });

    console.log(`serveDir response status: ${response.status}`);
    if (response.status !== 404) {
      return response;
    } else {
      console.log("File not found in serveDir, falling back to index.html");
    }
  } catch (err) {
    console.error("serveDir error:", err);
  }

  // SPA fallback: serve index.html
  const indexPath = "../dist/index.html";
  console.log(`Serving SPA fallback: ${indexPath}`);
  return await serveFile(req, indexPath);
}

Deno.serve({ port: PORT }, handler);
