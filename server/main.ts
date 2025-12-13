// deno-lint-ignore-file no-explicit-any
import { Database } from "@db/sqlite";
import * as oak from "@oak/oak";
import * as path from "@std/path";
import { Port } from "../lib/utils/index.ts";
import listInsights from "./operations/list-insights.ts";
import lookupInsight from "./operations/lookup-insight.ts";
import addInsight from "./operations/add-insight.ts";
import deleteInsight from "./operations/delete-insight.ts";
import { createTablesSql } from "./tables/index.ts";

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
  const params = ctx.params;
  const result = lookupInsight({ db, id: Number(params.id) });
  ctx.response.body = result;
  ctx.response.status = 200;
});

router.post("/insights/create", async (ctx) => {
  const body = await ctx.request.body.json();
  const result = addInsight({ db, brand: body.brand, text: body.text });
  ctx.response.body = result;
  ctx.response.status = 201;
});

router.delete("/insights/:id", (ctx) => {
  const params = ctx.params;
  const result = deleteInsight({ db, id: Number(params.id) });
  ctx.response.body = { deleted: result };
  ctx.response.status = result > 0 ? 200 : 404; // 404 if no rows affected
});

const app = new oak.Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env);
console.log(`Started server on port ${env.port}`);
