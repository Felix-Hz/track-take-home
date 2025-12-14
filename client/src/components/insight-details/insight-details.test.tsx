import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { InsightDetailsModal } from "./insight-details.tsx";
import type { Insight } from "../../schemas/insight.ts";

const noOp = () => undefined;

const TEST_INSIGHT: Insight = {
  id: 1,
  brand: 1,
  createdAt: new Date("2024-01-15T10:30:00Z"),
  text: "Test insight text",
};

describe("InsightDetailsModal", () => {
  it("renders", () => {
    render(
      <InsightDetailsModal
        // deno-lint-ignore jsx-boolean-value
        open={true}
        onClose={noOp}
        insight={TEST_INSIGHT}
      />,
    );
    expect(screen.getByText("Insight Details")).toBeTruthy();
    expect(screen.getByText(/Brand:/)).toBeTruthy();
    expect(screen.getByText(/Created:/)).toBeTruthy();
    expect(screen.getByText(/Insight:/)).toBeTruthy();
    expect(screen.getByText(TEST_INSIGHT.text)).toBeTruthy();
  });
});
