/**
 * SQL STUFFS
 */

export const createTable = `
  CREATE TABLE IF NOT EXISTS insights (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    brand INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    text TEXT NOT NULL
  );
`;

// NOTE: When preparing the statement for sqlite respect the order of the params or bad things will happen.
export const insertStatement =
  `INSERT INTO insights (brand, createdAt, text) VALUES (?, ?, ?)`;

/**
 * TABLE TYPES FOR APPLICATION USE
 */

export type Row = {
  id: number;
  brand: number;
  createdAt: string;
  text: string;
};

export type Insert = {
  brand: number;
  createdAt: string;
  text: string;
};
