import { compile } from "./build-html.ts";
import cv from "./cv.json";
import template from "./theme/template.txt";
import { withHtmlLiveReload } from "bun-html-live-reload";

if (import.meta.main) {
  Bun.serve(
    withHtmlLiveReload({
      port: 3000,
      async fetch(req) {
        const html = compile(template, cv);

        return new Response(html, {
          headers: {
            "Content-Type": "text/html",
          },
        });
      },
    })
  );

  console.log(`Serving at http://localhost:3000/`);
}
