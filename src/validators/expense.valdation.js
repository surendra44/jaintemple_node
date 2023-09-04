import Joi from "joi";
const { objectId } = require("./custom.validation");

export const createExpense = {
  body: Joi.object().keys({
    expensesName: Joi.string().required(),
    expensesCategoryId: Joi.custom(objectId).allow(null),
    eventExpensesId: Joi.custom(objectId).allow(null),
    eventCategoryId: Joi.custom(objectId).allow(null),
    expensesAccNumberFrom: Joi.string().allow(""),
    expensesAccNumberTo: Joi.string().allow(""),
    expensesPayemntType: Joi.string().allow(""),
    payeeName: Joi.string().allow(""),
    expensesAmount: Joi.number().required(),
    expensesStatus: Joi.string(),
    expensesDetail: Joi.string(),
    expensesDate: Joi.date().iso(),
  }),
};

export const updateExpense = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    expensesName: Joi.string().required(),
    expensesCategoryId: Joi.custom(objectId).allow(null),
    eventExpensesId: Joi.custom(objectId).allow(null),
    eventCategoryId: Joi.custom(objectId).allow(null),
    expensesAccNumberFrom: Joi.string().allow(""),
    expensesAccNumberTo: Joi.string().allow(""),
    expensesPayemntType: Joi.string().allow(""),
    payeeName: Joi.string().allow(""),
    expensesAmount: Joi.number().required(),
    templeID: Joi.custom(objectId),
    expensesStatus: Joi.string(),
    expensesDetail: Joi.string(),
    expensesDate: Joi.date().iso(),
  }),
};

export const deleteExpense = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

export const getExpenseById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};
