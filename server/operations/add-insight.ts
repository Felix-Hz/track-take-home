import type { HasDBClient } from "../shared.ts";
import { type Insert, insertStatement } from "$tables/insights.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input): number => {
  const { db, brand, text } = input;
  console.debug("Adding insight", { brand, text });

  const insertData: Insert = {
    brand,
    text,
    createdAt: new Date().toISOString(),
  };

  // Run is an `exec` alias that will return the nr of rows affected.
  // See docs: https://jsr.io/@db/sqlite/doc/~/Database#method_exec_0
  const changes = db.prepare(insertStatement).run([
    insertData.brand,
    insertData.createdAt,
    insertData.text,
  ]);

  if (changes === 0) {
    throw new Error("Failed to add insight");
  }

  console.debug("Insight added successfully");
  return changes;
};
