import pg from "pg";

let db: null | pg.Pool;

export const connect = () => {
  if (!db) {
    db = new pg.Pool({ connectionString: process.env.DB_CONN_STRING });
    return db;
  }
  return db;
};
