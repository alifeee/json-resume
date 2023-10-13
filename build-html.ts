import Handlebars from "handlebars";
import cv from "./cv.json";
import template from "./theme/template.txt";

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
  const html = compile(template, cv);
  await Bun.write("cv.html", html);
  console.log(`Saved cv.html`);
}
