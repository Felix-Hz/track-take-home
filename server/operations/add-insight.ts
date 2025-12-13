import type { HasDBClient } from "../shared.ts";
import type { Insight } from "$models/insight.ts";
import { type Insert, insertStatement, type Row } from "$tables/insights.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input): Insight => {
  const { db, brand, text } = input;
  console.debug("Adding insight", { brand, text });

  const insertData: Insert = {
    brand,
    text,
    createdAt: new Date().toISOString(),
  };

  // Run is an `exec` alias that will return the nr of rows affected.
  // See docs: https://jsr.io/@db/sqlite/doc/~/Database#method_exec_0
  db.prepare(insertStatement).run([
    insertData.brand,
    insertData.createdAt,
    insertData.text,
  ]);

  // Return required props to the caller
  const [row] = db.sql<
    Row
  >`SELECT id, brand, createdAt, text FROM insights WHERE id = ${db.lastInsertRowId}`;

  if (row) {
    const insight = { ...row, createdAt: new Date(row.createdAt) };
    console.debug("Insight added successfully", insight);
    return insight;
  }

  throw new Error("Failed to retrieve inserted insight");
};
