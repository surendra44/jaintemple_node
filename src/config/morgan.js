import morgan, { token } from "morgan";
import logger from "./logger";

token("message", (req, res) => res.locals.errorMessage || "");

const successResponseFormat = `:remote-addr :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status - :response-time ms ":referrer" ":user-agent"`;
const errorResponseFormat = `:remote-addr :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status - :response-time ms - ":referrer" ":user-agent" - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export default {
  successHandler,
  errorHandler,
};
