import { Console } from "winston/lib/winston/transports";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const ExpenseDetail = require('../models/expenseDetail');



export const addexpenses = async (eventData)=> {
    try {
      const newEvent = await ExpenseDetail.create(eventData);
      return newEvent;
    }  catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }

  export const updateExpense = async (expenseId,updatedData)=> {
    try {
        const updateExpense = await ExpenseDetail.findByIdAndUpdate(
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
            const DeleteEvent = await ExpenseDetail.findByIdAndDelete(expenseId);
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
                const event = await ExpenseDetail.findById(expenseId).populate('expensesCategoryId')
                .populate('eventExpensesId')
                .populate('eventCategoryId');
                  if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
                return event;
              }catch (e) {
                  console.log(e);
                  throw new Error(e);
              }
          }


          export const getallExpense = async(paginationOptions,filter,sortBy)=>{

            try {
              const { page, size } = paginationOptions;
          
              const totalDocuments = await ExpenseDetail.countDocuments(filter);
              const totalPages = Math.ceil(totalDocuments / size);
              const skip = (page - 1) * size;
          
              const result = await ExpenseDetail.find(filter)
                .sort(sortBy)
                .skip(skip)
                .limit(size)
                .populate('eventExpensesId')
                .populate('eventCategoryId');

              return {
                page,
                size,
                data: result,
                previousPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null,
                totalDocuments,
              };
            } catch (e) {
              console.log(e);
              throw new Error(e);
            }

          }



          export const getDayExpense = async () => {
            try {
              const todayDate = new  Date().toISOString();
              const [year, month, day] = todayDate.split('T')[0].split("-");
              const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
              const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
              const data = await ExpenseDetail.find({ expensesDate: { $gte: fromDate, $lte: toDate } });
              const sum = data.reduce((total,expense)=>total+expense.expensesAmount, 0)
              console.log(sum);
              return sum;
            } catch (e) {
              console.log(e);
              throw new Error(e);
            }
          };


          export const  getTotalExpense = async () => {
            try {
              const data = await ExpenseDetail.find()
              const sum = data.reduce((total,expense)=>total+expense.expensesAmount, 0)
              console.log(sum);
              return sum;
            } catch (e) {
              console.log(e);
              throw new Error(e);
            }
          };



          