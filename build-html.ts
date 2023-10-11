import Handlebars from "handlebars";
import cv from "./cv.json";
import template from "./theme/template.txt";

export function compile(template: string, content: object): string {
  const tpls = Handlebars.compile(template);
  return tpls(content);
}

if (import.meta.main) {
  const html = compile(template, cv);
  await Bun.write("index.html", html);
  console.log(`Saved index.html`);
}
