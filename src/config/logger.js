import * as winston from "winston";
import * as httpContext from "express-http-context";
import { NODE_ENVIRONMENT } from "../helpers/constants";
import * as config from "./config";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === NODE_ENVIRONMENT.DEVO ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === NODE_ENVIRONMENT.DEVO ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `[${httpContext.get("reqId") || ""}] ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

logger.info(`Launching server in ${config.env} mode`); 

export default logger;
