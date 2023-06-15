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

// redact name and pronouns
if (redact) {
  resumeString = resumeString.replace(/(Alfred Renn|Alfred)/g, "REDACTED");
  resumeString = resumeString.replace(/\sHe\s/g, " They ");
}

const resume = JSON.parse(resumeString);

// redact (remove) contact info and address

if (redact) {
  delete resume.basics.phone;
  delete resume.basics.email;
  delete resume.basics.location;
  delete resume.basics.profiles;
  delete resume.basics.url;
  delete resume.basics.image;
}

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

// these removals are theme-specific (to kendall)
if (redact) {
  // remove "View online" link
  html = html.replace(/<span class="visible-print"(.|\n)*?<\/span>/gm, "");
  // no top margin needed without image
  html = html.replace(
    /\.container{\n  margin-top: 80px;/gm,
    ".container{\n  margin-top: 0px;"
  );
}

writeFile("resume.html", html);
console.log(`You can find your HTML resume at resume.html. Nice work! 🚀`);
