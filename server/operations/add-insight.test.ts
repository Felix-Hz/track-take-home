import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import addInsight from "./add-insight.ts";

describe("adding insights to the database", () => {
  withDB((fixture) => {
    const newInsight: Omit<Insight, "id"> = {
      brand: 1,
      createdAt: new Date(),
      text: "New insight",
    };

    let insertedInsight: Insight;

    beforeAll(() => {
      insertedInsight = addInsight({ ...fixture, ...newInsight });
    });

    it("inserts the insight and returns it with an id", () => {
      expect(insertedInsight).toEqual(
        expect.objectContaining({ text: newInsight.text }),
      );
      expect(insertedInsight).toEqual(
        expect.objectContaining({ brand: newInsight.brand }),
      );
      expect(insertedInsight.id).toBeGreaterThan(0);
      expect(insertedInsight.createdAt.getDate()).toBe(
        newInsight.createdAt.getDate(),
      );
    });
  });
});
