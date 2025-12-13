import { formatDateTime } from "./dates.ts";
import { describe, expect, it } from "vitest";

describe("formatDateTime", () => {
  it("should format date string correctly", () => {
    const dateString = "2023-10-05T14:30:00Z";
    const formatted = formatDateTime(dateString);

    // Exact output may vary based on locale, so check for key components
    expect(formatted).toMatch(/2023/);
    expect(formatted).toMatch(/October/);
    expect(formatted).toMatch(/5/);
    expect(formatted).toMatch(/2[0-3]:30/); // hour can vary based on timezone due to UTC offset
  });
});
