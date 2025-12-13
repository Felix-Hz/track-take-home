import { formatDateTime } from "./dates.ts";
import { describe, expect, it } from "vitest";

describe("formatDateTime", () => {
  it("should format date string correctly", () => {
    const dateString = "2023-10-05T12:30:00Z";
    const formatted = formatDateTime(dateString);

    // Exact output may vary based on locale, so check for key components
    expect(formatted).toMatch(/2023/);
    expect(formatted).toMatch(/10/);
    expect(formatted).toMatch(/:30/); // hour can vary based on timezone due to UTC offset
  });

  it("should format date object correctly", () => {
    const dateObj = new Date("2023-10-05T12:30:00Z");
    const formatted = formatDateTime(dateObj);

    // Exact output may vary based on locale, so check for key components
    expect(formatted).toMatch(/2023/);
    expect(formatted).toMatch(/10/);
    expect(formatted).toMatch(/:30/); // hour can vary based on timezone due to UTC offset
  });

  it("should handle invalid date strings", () => {
    const invalidDateString = "invalid-date";
    const formatted = formatDateTime(invalidDateString);
    expect(formatted).toBe("Invalid Date");
  });
});
