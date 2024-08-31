import express from "express";
import databaseDatasControler from "../controllers/databaseDatasController";

const router = express.Router();

router.get("/postgresInfo", databaseDatasControler.getPostgresInfo);

export default router;
