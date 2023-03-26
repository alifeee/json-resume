const fs = require("fs");
const resumeSchema = require("resume-schema");

const resumeObject = JSON.parse(fs.readFileSync("cv.json", "utf8"));

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
resumeSchema.validate(resumeObject, callback);
