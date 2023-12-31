require("@babel/register");
require("dotenv/config");

const { dbConnect } = require("./config/db");
const  port  = require("./config/config");
const { app } = require("./app");
const logger = require("./config/logger").default;

let server;
dbConnect.then(
  () => {
    const appPort = port.port || 3000;
    server = app.listen(appPort, () => {
      logger.info(`App running on port ${appPort}...`);
    });
  },
  (err) => {
    logger.error("Unable to connect to the database. Shutting down !!", err);
  }
);

const unexpectedErrorHandler = (error) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  logger.error("uncaughtException Err::", error);
  logger.error(error);
};

// Handle uncaught exceptions
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM RECEIVED. Shutting down gracefully");
  if (server) {
    server.close();
  }
});