// uses Puppeteer to print a PDF of the page
// https://pptr.dev/
// https://github.com/puppeteer/puppeteer/blob/main/examples/pdf.js

import puppeteer from "puppeteer";
import { readFile, writeFile } from "node:fs/promises";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`file://${__dirname}/resume.html`, {
    waitUntil: "networkidle0",
  });
  await page.pdf({
    path: "resume.pdf",
    format: "A4",
  });

  await browser.close();
})();

console.log(`You can find your PDF resume at resume.pdf. Nice work! 🚀`);
