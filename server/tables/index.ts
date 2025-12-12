import { createTable as createInsightsTable } from "./insights.ts";

/*
 * Combined SQL string to create all application tables
 */
export const createTablesSql = [createInsightsTable].join();
