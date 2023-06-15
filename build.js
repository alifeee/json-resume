// loads resume.json. renders it using the render function from the theme. theme is specified in the meta section of the resume.json or as an argument to the build script.
// https://jsonresume.org/
import { readFile, writeFile } from "node:fs/promises";

// get environment theme from "node build.js --<theme>"
// or if "--redact", redact name and pronouns etc
const args = process.argv.slice(2);
var hasEnvironmentTheme = false;
var environmentTheme;
var redact = false;
for (var i = 0; i < args.length; i++) {
  if (args[i] === "--redact") {
    redact = true;
  } else if (args[i].startsWith("--")) {
    hasEnvironmentTheme = true;
    var environmentTheme = args[i].substring(2);
  }
}

var resumeString = await readFile("resume.json", "utf-8");


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

let html = render(resume);
// replace "&#x2F;" with "/"
html = html.replace(/&#x2F;/g, "/");
writeFile("resume.html", html);
console.log(`You can find your HTML resume at resume.html. Nice work! 🚀`);
