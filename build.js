import { readFile, writeFile } from "node:fs/promises";

const resume = JSON.parse(await readFile("resume.json", "utf-8"));

// get theme from "node build.js <theme>"
const args = process.argv.slice(2);
const argtheme = args[0];

const theme = argtheme ?? resume?.meta?.theme;

let render;
try {
  const themeModule = await import(theme);
  render = themeModule.render;
} catch (err) {
  console.error(`Could not load theme ${theme}. Is it installed?`);
  process.exitCode = 1;
  process.exit();
}

writeFile("resume.html", render(resume));
console.log(`You can find your rendered resume at resume.html. Nice work! 🚀`);
