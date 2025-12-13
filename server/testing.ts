import { Database } from "@db/sqlite";
import {
  createTable as createInsightsTable,
  type Insert,
  insertStatement as insertInsightStatement,
  type Row,
} from "$tables/insights.ts";
import type { HasDBClient } from "./shared.ts";
import { afterAll, beforeAll } from "@std/testing/bdd";

type Fixture = HasDBClient & {
  insights: {
    insert(insights: Insert[]): void;
    selectAll(): Row[];
  };
};

export const withDB = <R>(fn: (fixture: Fixture) => R): R => {
  const db = new Database(":memory:");

  beforeAll(() => {
    db.exec(createInsightsTable);
  });

  afterAll(() => db.close());

  return fn({
    db,
    insights: {
      selectAll() {
        return db.sql<Row>`SELECT * FROM insights`;
      },
      insert(insights) {
        for (const item of insights) {
          db.prepare(insertInsightStatement).run([
            item.brand,
            item.createdAt,
            item.text,
          ]);
        }
      },
    },
  });
};
