// uses Puppeteer to print a PDF of the page
// https://pptr.dev/
// https://github.com/puppeteer/puppeteer/blob/main/examples/pdf.js

import puppeteer from "puppeteer";
import { readFile, writeFile } from "node:fs/promises";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
var extraWait = 0;
for (var i = 0; i < args.length; i++) {
  if (args[i] === "--extra-wait") {
    extraWait = 5000;
  }
}

async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  // bootstrap has a @media print query which sets "color: black !important;". it is *very hard* to override this. So I've just copied the bootstrap css and removed it. When we make a pdf I replace the bootstrap css. Jank
  const resumeHTML_bootstrap = await readFile("cv.html", "utf-8");
  const replacement_bootstrap = await readFile("bootstrap.min.css");
  const resumeHTML = resumeHTML_bootstrap.replace(
    /<link href="https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap\/3\.3\.7\/css\/bootstrap\.min\.css" rel="stylesheet">/g,
    `<style>
    ${replacement_bootstrap}
    </style>`
  );

  const page = await browser.newPage();
  await page.setContent(resumeHTML, {
    waitUntil: "networkidle0",
  });
  // wait for images - https://stackoverflow.com/a/49233383
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.getElementsByTagName("img"), (image) => {
        if (image.complete) return;

        return new Promise((resolve, reject) => {
          image.addEventListener("load", resolve);
          image.addEventListener("error", reject);
        });
      })
    );
  });
  // delay in case of images >:(
  // disabled because I hope it's not needed. re-enable if needed
  // can be enabled with --extra-wait flag
  await timeout(extraWait);
  await page.pdf({
    path: "cv.pdf",
    format: "A4",
  });

  await browser.close();

  console.log(`You can find your PDF resume at cv.pdf. Nice work! 🚀`);
})();
