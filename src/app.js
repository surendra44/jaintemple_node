import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import httpStatus from "http-status";
import uuid from "node-uuid";
import * as httpContext from "express-http-context";
import morganBody from "morgan-body";
import _ from "lodash";
import morgan from "./config/morgan";
import { errorHandler, errorConverter } from "./middleware/errorHandler";

import routes from "./routes";
import logger from "./config/logger";


export const app = express();

// Assign random UUID to each incoming request
app.use(httpContext.middleware);
app.use((req, res, next) => {
  req.id = uuid.v4();
  httpContext.set("reqId", req.id);

 next();
});

function convertData(req, originalData) {
  return JSON.parse(JSON.stringify(originalData).replace(/\:null/gi, "\:\"\"")); 
}

morganBody(app, {
  logAllReqHeader: false,
  logRequestId: true,
  logReqHeaderList: true,
  includeNewLine: true,
  noColors: true,
  prettify: false,
});
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// sanitize request data
app.use(xss());

app.use(cors());
app.options("*", cors());

// api routes
//app.use(routes);
app.use('/v1', routes);
// Health check
app.use("/health", (req, res) => {
  return res.status(200).send("healthy");
});

app.get("/", (req, res) => {
  return res.status(200).send("healthy");
});

// send back a 404 error for any unknown api request
app.use((req, res) => {
  return res.sendStatus(httpStatus.NOT_IMPLEMENTED);
});

app.use(errorConverter);

app.use(errorHandler);

// In case of an error
app.on("error", (appErr, appCtx) => {
  logger.error(`app error: ${appErr.stack}`);
  logger.error(`on url: ${appCtx.req.url}`);
  logger.error(`With headers: ${appCtx.req.headers}`);
});
