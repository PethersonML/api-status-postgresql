import dotenv from "dotenv";
import express from "express";
import databaseDatasRoutes from "./routes/databaseDatasRoutes";
import database from "./infra/database.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const port = process.env.PORT || 3000;

app.use("api/v1", databaseDatasRoutes);

// app.get("/api/v1/status", async (req, res) => {
//   const updatedAt = new Date().toISOString();

// console.log("------------------------------ pg_stat_activity ------------------------------");
// console.log(await database.query("SELECT * FROM pg_stat_activity"));
// console.log("------------------------------------------------------------------------------")

// console.log("------------------------------ pg_stat_database ------------------------------");
// console.log(await database.query("SELECT * FROM pg_stat_database"));
// console.log("------------------------------------------------------------------------------")

// console.log("------------------------- pg_stat_database_conflicts -------------------------");
// console.log(await database.query("SELECT * FROM pg_stat_database_conflicts"));
// console.log("------------------------------------------------------------------------------")

// console.log("-------------------------- pg_stat_xact_user_tables --------------------------");
// console.log(await database.query("SELECT * FROM pg_stat_xact_user_tables"));
// console.log("------------------------------------------------------------------------------")

// console.log("------------------------------------ SHOW ------------------------------------");
// const databaseInfos = await database.query("SHOW ALL");
// console.log("------------------------------------------------------------------------------")

//   res.status(200).json({
//     updated_at: updatedAt,
//     database_configs_limit: {
//       configs: databaseInfos,
//     },
//   });
// });

app.listen(port, () => {
  console.log(`Application running on http://localhost:${port}`);
});
