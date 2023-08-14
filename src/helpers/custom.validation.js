import Joi from "joi";
import _ from "lodash";
import { BadRequestError } from "./error/badRequestError";
import logger from "../config/logger";

export const passwordValidator = (value, helpers) => {
  if (value.length < 8) return helpers.message("password must be at least 8 characters");
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) return helpers.message("password must be alpha numeric");
  return value;
};

export const nameValidator = (value, helpers) => {
  if (!value.match(/^[a-zA-Z ]*$/ || value.length > 25)) {
    return helpers.message(`${helpers.state.path.join(">")} string is not valid`);
  }
  return value;
};

export const addressValidator = (value, helpers) => {
  if (!value.match(/^[a-zA-Z0-9\s,'-]*$/)) {
    return helpers.message(`${helpers.state.path.join(">")} string is not valid`);
  }
  return value;
};

export const aadharcardValidator = (value,helpers) => {
  if(!value.match(/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/)){
    return helpers.message("Aadhar card number format is incorrect");
  }
  return value;
}


export const phoneNumberValidator = (value, helpers) => {
  if (value.toString().length != 10) {
    return helpers.message("Phone number must be at least 10 characters");
  }
  if (!value.toString().match("^[6789]\\d{9}$")) {
    return helpers.message("Phone number format is incorrect");
  }
  return value;
};

export const pinCodeValidator = (value, helpers) => {
  if (!value.toString().match("^[1-9][0-9]{5}$")) {
    return helpers.message("Pincode must be at least 6 characters");
  }
  return value;
};

export const validate = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ["params", "query", "body", "files"]);
  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false, dateFormat: "utc" })
    .validate(object);

  if (error) {
    const error_to_log = _.omit(error, "_original.files");
    logger.error(`Joi Validation errors: ${JSON.stringify(error_to_log)}`);
    const errorMessage = _.map(error.details, "message").join(", ");
    let error_messages  = {};
    const error_fields = _.union(
      _.map(error.details, (detail) => {
        if (detail.context.key) {
          error_messages[detail.context.key ] = detail.message;
          return detail.context.key;      
        }
        return _.last(detail.path);
      })
    );
    return next(new BadRequestError(errorMessage, error_fields,error_messages));
  }
  Object.assign(req, value);
  return next();
};

export const isValidDate = (value, helpers) => {
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  console.log("value", value)
  if(!value.match(regEx)) return helpers.message("Invalid date format. try with YYYY-MM-DD format");
  let d = new Date(value);
  let dNum = d.getTime();
  if(!dNum && dNum !== 0) return helpers.message("Invalid date format. try with YYYY-MM-DD format");
  if(!d.toISOString().slice(0,10) === value){
    return helpers.message("Invalid date format. try with YYYY-MM-DD format");
  }
  return value;
}


