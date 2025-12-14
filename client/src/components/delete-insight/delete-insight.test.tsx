import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeleteInsightModal } from "./delete-insight.tsx";

const noOp = () => undefined;

describe("DeleteInsightModal", () => {
  it("renders", () => {
    render(
      <DeleteInsightModal
        // deno-lint-ignore jsx-boolean-value
        open={true}
        onClose={noOp}
        onConfirm={noOp}
      />,
    );
    expect(screen.getByText("Delete Insight")).toBeTruthy();
    expect(
      screen.getByText("Are you sure you want to delete this insight?"),
    ).toBeTruthy();
    expect(screen.getByText("Cancel")).toBeTruthy();
    expect(screen.getByText("Delete")).toBeTruthy();
  });
});
