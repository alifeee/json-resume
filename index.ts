import { compile } from "./build-html.ts";
import cv from "./cv.json";
import template from "./theme/template.txt";
import { withHtmlLiveReload } from "bun-html-live-reload";

if (import.meta.main) {
  Bun.serve(
    withHtmlLiveReload({
      port: 3000,
      async fetch(req) {
        if (req.url.endsWith("/")) {
          const html = compile(template, cv);

          return new Response(html, {
            headers: {
              "Content-Type": "text/html",
            },
          });
        } else if (req.url.endsWith(".css")) {
          const path = req.url.split("/").pop();
          return new Response(Bun.file(`theme/${path}`), {
            headers: {
              "Content-Type": "text/css",
            },
          });
        } else {
          return new Response("Not found", {
            status: 404,
          });
        }
      },
    })
  );

  console.log(`Serving at http://localhost:3000/`);
}
