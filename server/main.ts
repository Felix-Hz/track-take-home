import { Database } from "@db/sqlite";
import * as oak from "@oak/oak";
import * as path from "@std/path";
import { Port } from "../lib/utils/index.ts";
import listInsights from "./operations/list-insights.ts";
import lookupInsight from "./operations/lookup-insight.ts";
import addInsight from "./operations/add-insight.ts";
import deleteInsight from "./operations/delete-insight.ts";
import { createTablesSql } from "./tables/index.ts";
import {
  CreateInsight,
  NonNegativeInt as InsightID,
} from "./models/insight.ts";

console.log("Loading configuration");

const env = {
  port: Port.parse(Deno.env.get("SERVER_PORT")),
};

const dbFilePath = path.resolve("tmp", "db.sqlite3");

console.log(`Opening SQLite database at ${dbFilePath}`);

await Deno.mkdir(path.dirname(dbFilePath), { recursive: true });
const db = new Database(dbFilePath);

console.log("Initialising database tables");
db.exec(createTablesSql);

console.log("Initialising server");

const router = new oak.Router();

router.get("/_health", (ctx) => {
  ctx.response.body = "OK";
  ctx.response.status = 200;
});

router.get("/insights", (ctx) => {
  const result = listInsights({ db });
  ctx.response.body = result;
  ctx.response.status = 200;
});

router.get("/insights/:id", (ctx) => {
  const result = InsightID.safeParse(Number(ctx.params.id));
  if (!result.success) {
    ctx.response.body = { error: "Invalid insight ID" };
    ctx.response.status = 400;
    return;
  }
  const insight = lookupInsight({ db, id: result.data });
  ctx.response.body = insight;
  ctx.response.status = 200;
});

router.post("/insights/create", async (ctx) => {
  const body = await ctx.request.body.json();
  const result = CreateInsight.safeParse(body);
  if (!result.success) {
    ctx.response.body = { error: "Invalid insight data" };
    ctx.response.status = 400;
    return;
  }
  const insight = addInsight({
    db,
    text: result.data.text,
    brand: result.data.brand,
  });
  ctx.response.body = insight;
  ctx.response.status = 201;
});

router.delete("/insights/:id", (ctx) => {
  const result = InsightID.safeParse(Number(ctx.params.id));
  if (!result.success) {
    ctx.response.body = { error: "Invalid insight ID" };
    ctx.response.status = 400;
    return;
  }
  const rowsAffected = deleteInsight({ db, id: result.data });
  if (rowsAffected > 0) {
    ctx.response.body = { message: "Insight deleted successfully" };
  } else {
    ctx.response.body = { error: "Insight not found" };
  }
  ctx.response.status = rowsAffected > 0 ? 200 : 404;
});

const app = new oak.Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env);
console.log(`Started server on port ${env.port}`);
