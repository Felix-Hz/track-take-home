import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting insights from the database", () => {
  withDB((fixture) => {
    const insights: Insight[] = [
      { id: 1, brand: 0, createdAt: new Date(), text: "1" },
      { id: 2, brand: 0, createdAt: new Date(), text: "2" },
      { id: 3, brand: 1, createdAt: new Date(), text: "3" },
    ];

    let affectedRows: number;
    let remainingInsights: Insight[];

    beforeAll(() => {
      fixture.insights.insert(
        insights.map((it) => ({
          ...it,
          createdAt: it.createdAt.toISOString(),
        })),
      );
      affectedRows = deleteInsight({ ...fixture, id: 2 });
      remainingInsights = fixture.insights.selectAll().map((row) => ({
        ...row,
        createdAt: new Date(row.createdAt),
      }));
    });

    it("does not contain the deleted insight", () => {
      expect(remainingInsights).toEqual([insights[0], insights[2]]);
    });

    it("returns affected row", () => {
      expect(affectedRows).toBe(1);
    });
  });
});
