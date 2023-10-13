import Handlebars from "handlebars";

function load_cv(): Promise<object> {
  return Bun.file("cv.json").json();
}

function load_template(): Promise<string> {
  return Bun.file("theme/template.hbs").text();
}

function compile(template_source: string, template_content: object): string {
  const template = Handlebars.compile(template_source);
  return template(template_content);
}

function save_html(html: string): Promise<number> {
  return Bun.write("index.html", html);
}

const cv_json = await load_cv();
const template_source = await load_template();
const html = compile(template_source, cv_json);
await save_html(html);

console.log("Done!");

// if main
// if (import.meta.main) {
//   Bun.serve({
//     port: 3000,
//     async fetch(req) {
//       const cv_json = await load_cv();
//       const template_source = await load_template();
//       const html = compile(template_source, cv_json);

//       return new Response(html, {
//         headers: {
//           "Content-Type": "text/html",
//         },
//       });
//     },
//   });
//   console.log(`Serving at http://localhost:3000/`);
// }
