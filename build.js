import { readFile, writeFile } from "node:fs/promises";

// get args
const args = process.argv.slice(2);
const theme = `jsonresume-theme-${args[0]}`;

// get theme
let render;
try {
  const themeModule = await import(theme);
  render = themeModule.render;
} catch (err) {
  console.error(`Could not load theme ${theme}. Is it installed?`);
  process.exitCode = 1;
  process.exit();
}

const cv = JSON.parse(await readFile("resume.json", "utf-8"));

writeFile("resume.html", render(cv));
console.log(`You can find your rendered resume at resume.html. Nice work! 🚀`);
