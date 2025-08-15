// // // main.ts (server entry point for Deno Deploy)
// // import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
// // import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

// // serve((req) => serveDir(req, { fsRoot: "dist" }));

// // main.ts (server entry point for Deno Deploy)
// import { serveDir, serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";

// const PORT = Number(Deno.env.get("PORT")) || 3000;

// async function handler(req: Request): Promise<Response> {
//   const url = new URL(req.url);
//   const pathname = url.pathname;

//   // Special case: serve favicon if requested
//   if (pathname === "/favicon.ico") {
//     try {
//       return await serveFile(req, "./dist/favicon.ico");
//     } catch {
//       // Ignore if no favicon exists
//     }
//   }

//   // Serve static files from ./dist
//   try {
//     const response = await serveDir(req, {
//       fsRoot: "./dist",
//       urlRoot: "",
//       showDirListing: false,
//       enableCors: true,
//       quiet: true,
//     });

//     // If file exists, return it
//     if (response.status !== 404) {
//       return response;
//     }
//   } catch {
//     // Ignore errors from serveDir
//   }

//   // SPA fallback: serve index.html for unknown paths
//   return await serveFile(req, "./dist/index.html");
// }

// // Start the server
// Deno.serve({ port: PORT }, handler);


// deno/main.ts (Deno Deploy entry point)
import { serveDir, serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";

const PORT = Number(Deno.env.get("PORT")) || 3000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Serve favicon if requested
  if (pathname === "/favicon.ico") {
    try {
      return await serveFile(req, "../dist/favicon.ico"); // relative to main.ts
    } catch {
      // Ignore if no favicon exists
    }
  }

  // Serve static files from ../dist
  try {
    const response = await serveDir(req, {
      fsRoot: "../dist",   // relative to main.ts
      urlRoot: "",
      showDirListing: false,
      enableCors: true,
      quiet: true,
    });

    // If file exists, return it
    if (response.status !== 404) {
      return response;
    }
  } catch {
    // Ignore errors from serveDir
  }

  // SPA fallback: serve index.html for unknown paths
  return await serveFile(req, "../dist/index.html");
}

// Start the server
Deno.serve({ port: PORT }, handler);
