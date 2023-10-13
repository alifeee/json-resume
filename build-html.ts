import Handlebars from "handlebars";
import cv from "./cv.json";
import template from "./theme/template.txt";
import { readdir, mkdir } from "node:fs/promises";

export function dateToYear(date: string): string {
  return new Date(date).getFullYear().toString();
}

export function dateToMonthName(date: string): string {
  return new Date(date).toLocaleString("en-UK", { month: "long" });
}

export function dateToDay(date: string): string {
  return new Date(date).toLocaleString("en-UK", { day: "numeric" });
}

let icons: { [key: string]: string } = {
  googleplus: "fab fa-google-plus",
  flickr: "fab fa-flickr",
  codepen: "fab fa-codepen",
  soundcloud: "fab fa-soundcloud",
  reddit: "fab fa-reddit",
  tumblr: "fab fa-tumblr",
  stackoverflow: "fab fa-stack-overflow",
  "stack-overflow": "fab fa-stack-overflow",
  blog: "fas fa-rss",
  rss: "fas fa-rss",
  gitlab: "fab fa-gitlab",
  github: "fab fa-github",
};

export function iconify(network: string): string {
  network = network.toLowerCase();
  if (network in icons) {
    return icons[network];
  }
  return `fab fa-${network}`;
}

export function compile(template: string, content: object): string {
  const hb = Handlebars.compile(template);
  Handlebars.registerHelper("year", dateToYear);
  Handlebars.registerHelper("month", dateToMonthName);
  Handlebars.registerHelper("day", dateToDay);
  Handlebars.registerHelper("iconify", iconify);

  return hb(content);
}

if (import.meta.main) {
  // if /build does not exist, create it
  try {
    await readdir("./build");
  } catch (err) {
    await mkdir("./build");
  }

  // copy all files in /theme to /build
  Bun.write("./build/style.css", Bun.file("./theme/style.css"));
  Bun.write("./build/print.css", Bun.file("./theme/print.css"));
  Bun.write("./build/bootstrap.min.css", Bun.file("./theme/bootstrap.min.css"));
  Bun.write(
    "./build/fontawesome.min.css",
    Bun.file("./theme/fontawesome.min.css")
  );

  // compile template
  const html = compile(template, cv);
  await Bun.write("./build/cv.html", html);

  console.log(
    `You can find your HTML resume at ./build/cv.html. Nice work! 🚀`
  );
}
