import { describe, expect, test } from "bun:test";
import resumeSchema from "resume-schema";
import { dateToDay, dateToMonthName, dateToYear, iconify } from "./build-html";

const cv_path = "cv.json";
const cv_file = Bun.file(cv_path);
const cv = await cv_file.json();

test("cv is valid to schema", async () => {
  let error: Error | null = null;
  let report: string | null = null;

  await resumeSchema.validate(cv, function (err: Error, report: string) {
    error = err;
    report = report;
    expect(err).toBeNull();
  });
});

describe("helpers", () => {
  test("dateToYear", () => {
    expect(dateToYear("2020-12-25")).toBe("2020");
    expect(dateToYear("1970-6-1")).toBe("1970");
  });

  test("dateToMonthName", () => {
    expect(dateToMonthName("2020-12-25")).toBe("December");
    expect(dateToMonthName("1970-6-1")).toBe("June");
  });

  test("dateToDay", () => {
    expect(dateToDay("2020-12-25")).toBe("25");
    expect(dateToDay("1970-6-1")).toBe("1");
    expect(dateToDay("1970-6-07")).toBe("7");
  });

  test("iconify", () => {
    expect(iconify("blog")).toBe("fas fa-rss");
    expect(iconify("github")).toBe("fab fa-github");
    expect(iconify("unknown")).toBe("fab fa-unknown");
  });
});
