import mongoose from "mongoose";
import logger from "./logger";
import { db as dbConfig } from "./config";

logger.info(`Connecting to Database at ${dbConfig.MONGODB_URL}`);

export const dbConnect = mongoose.connect(dbConfig.MONGODB_URL, {connectTimeoutMS: 100000}).then(() => {
  logger.info("Database Connection has been established successfully.");
});
