import { Console } from "winston/lib/winston/transports";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const expenseDetail = require('../models/expenseDetail');



export const addexpenses = async (eventData)=> {
    try {
      const newEvent = await expenseDetail.create(eventData);
      return newEvent;
    }  catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }

  export const updateExpense = async (expenseId,updatedData)=> {
    try {
        const updateExpense = await expenseDetail.findByIdAndUpdate(
            expenseId,
          updatedData,
          { new: true }
        );
        return updateExpense;
      }catch (e) {
          console.log(e);
          throw new Error(e);
      }
    }


    export const deleteExpense = async(expenseId)=>{
        try {
            const DeleteEvent = await expenseDetail.findByIdAndDelete(expenseId);
            if(!DeleteEvent) throw new Error(ERROR_MESSAGE.NOT_FOUND);
            const message = "Deleted Successfully"
            return message;
          }catch (e) {
              console.log(e);
              throw new Error(e);
          }
        }


        export const  getExpenseById = async(expenseId)=>{
            try {
                const event = await expenseDetail.findById(expenseId).populate('expensesCategoryId')
                .populate('eventExpensesId')
                .populate('eventCategoryId');
                  if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
                return event;
              }catch (e) {
                  console.log(e);
                  throw new Error(e);
              }
          }


          export const getallExpense = async()=>{
            try {
                return expenseDetail.find().populate('expensesCategoryId')
                .populate('eventExpensesId')
                .populate('eventCategoryId');;
            }catch (e) {
                  console.log(e);
                  throw new Error(e);
              }
          }