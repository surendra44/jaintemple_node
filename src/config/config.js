import { config } from "dotenv";
import { join } from "path";
import Joi from "joi";
import { NODE_ENVIRONMENT } from "../helpers/constants";

console.log('dir',join(__dirname, "../../.env"));

config({ path: join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid(NODE_ENVIRONMENT.DEVO, NODE_ENVIRONMENT.TEST, NODE_ENVIRONMENT.PROD).required(),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string().required(),
    MONGODB_URL: Joi.string().required().description("Mongo DB Url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(20)
      .description("minutes after which verify email token expires"),
   
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = envVars.NODE_ENV;
export const port = envVars.PORT;
export const db = {
  MONGODB_URL: envVars.MONGODB_URL,
};
export const { BASE_URL } = envVars;
export const jwt = {
  secret: envVars.JWT_SECRET,
  accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
};
