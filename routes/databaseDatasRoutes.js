import express from "express";
import {
  getAllData,
  getPostgresInfo,
} from "../controllers/databaseDatasController.js";

const router = express.Router();

router.get("/general", getAllData);
router.get("/postgresInfo", getPostgresInfo);

export default router;
