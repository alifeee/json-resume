// uses Puppeteer to print a PDF of the page
// https://pptr.dev/
// https://github.com/puppeteer/puppeteer/blob/main/examples/pdf.js

import puppeteer from "puppeteer";
import { readFile, writeFile } from "node:fs/promises";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`file://${__dirname}/resume.html`, {
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
  await timeout(5000);
  await page.pdf({
    path: "resume.pdf",
    format: "A4",
  });

  await browser.close();

  console.log(`You can find your PDF resume at resume.pdf. Nice work! 🚀`);
})();
