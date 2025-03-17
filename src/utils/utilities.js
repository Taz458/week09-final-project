import pg from "pg";

export const db = new pg.Pool({
    connectionString: process.env.DB_URL,
});

//Bascially, I can use db now to query the database using sql.