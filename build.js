// loads resume.json. renders it using the render function from the theme. theme is specified in the meta section of the resume.json or as an argument to the build script.
// https://jsonresume.org/
import { readFile, writeFile } from "node:fs/promises";

const resume = JSON.parse(await readFile("resume.json", "utf-8"));

// get environment theme from "node build.js <theme>"
const args = process.argv.slice(2);
const environmentTheme = args[0];

// get theme from resume.json
const resumeTheme = `jsonresume-theme-${resume.meta?.theme}`;

const theme = environmentTheme ?? resumeTheme;
if (!theme) {
  console.error(
    "You must specify a theme in the meta section of your resume.json or as an argument to the build script."
  );
  process.exitCode = 1;
  process.exit();
}

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
console.log(`You can find your HTML resume at resume.html. Nice work! 🚀`);
