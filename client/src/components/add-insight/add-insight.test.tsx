import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AddInsight } from "./add-insight.tsx";

const noOp = () => undefined;

describe("AddInsight", () => {
  it("renders", () => {
    // deno-lint-ignore jsx-boolean-value
    render(<AddInsight open={true} onClose={noOp} />);
    expect(screen.getByText("Add a new insight")).toBeTruthy();
    expect(screen.getByText("Brand")).toBeTruthy();
    expect(screen.getByText("Insight")).toBeTruthy();
    expect(screen.getByPlaceholderText("Something insightful...")).toBeTruthy();
    expect(screen.getByText("Add insight")).toBeTruthy();
  });
});
