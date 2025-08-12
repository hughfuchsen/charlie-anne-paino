// main.ts (server entry point for Deno Deploy)
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

serve((req) => serveDir(req, { fsRoot: "dist" }));