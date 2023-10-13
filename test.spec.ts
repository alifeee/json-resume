import { expect, test } from "bun:test";
import resumeSchema from "resume-schema";

const cv_path = "cv.json";
const cv_file = Bun.file(cv_path);
const cv = await cv_file.json();

test("resume is valid to schema", async () => {
  let error: Error | null = null;
  let report: string | null = null;

  await resumeSchema.validate(cv, function (err: Error, report: string) {
    error = err;
    report = report;
    expect(err).toBeNull();
  });
});
