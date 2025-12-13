import type { HasDBClient } from "../shared.ts";
import { deleteStatement } from "$tables/insights.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): number => {
  const { db, id } = input;
  console.debug("Deleting insight", { id });

  // Run is an `exec` alias that will return the nr of rows affected.
  // See docs: https://jsr.io/@db/sqlite/doc/~/Database#method_exec_0
  const changes = db.prepare(deleteStatement).run([id]);

  if (changes === 0) {
    console.debug("No insight found to delete");
  } else {
    console.debug("Insight deleted successfully");
  }

  return changes;
};
