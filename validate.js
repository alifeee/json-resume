// Validates the resume.json file against the schema (https://jsonresume.org/schema/)
import { readFile, writeFile } from "node:fs/promises";
import { validate } from "resume-schema";

const resume = JSON.parse(await readFile("resume.json", "utf-8"));

const callback = (err, valid) => {
  if (err) {
    const error_message = err[0].message;
    const path = err[0].path;
    console.log(err);
    throw new Error(
      "\x1b[31mError validating JSON: " +
        error_message +
        " at " +
        path +
        "\x1b[0m"
    );
  } else {
    console.log("\x1b[32mJSON is valid\x1b[0m");
  }
};
validate(resume, callback);
