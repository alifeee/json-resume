import puppeteer from "puppeteer";

const cv_path = new URL("./build/cv.html", import.meta.url).href;

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.goto(cv_path, { waitUntil: "networkidle0" });
const pdf = await page.pdf({
  format: "A4",
});

await Bun.write("./build/cv.pdf", pdf);

await browser.close();

console.log(`Saved ./build/cv.pdf`);
