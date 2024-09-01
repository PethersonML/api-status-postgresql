import express from "express";
import {
  getAllData,
  getPostgresInfo,
  getConnectionConfig,
  getLogsConfig,
} from "../controllers/databaseDatasController.js";

const router = express.Router();

router.get("/general", getAllData);
router.get("/postgresInfo", getPostgresInfo);
router.get("/connectionConfigs", getConnectionConfig);
router.get("/logsConfigs", getLogsConfig);

export default router;
