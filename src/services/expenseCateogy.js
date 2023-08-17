
const mongoose = require('mongoose');
const ExpensesCategory = require('../models/expenseCategory');
const ObjectID = require('mongodb').ObjectId;



    export const addExpenseCategory= async (donationDetail)=> {
        try {
          const newDonation = await ExpensesCategory.create(donationDetail);
          return newDonation;
        }  catch (e) {
            console.log(e);
            throw new Error(e)
        }
      }


      export const updateExpCategory = async(expCategoryId, updatedData)=>{
        try {
          const updatedEvent = await ExpensesCategory.findByIdAndUpdate(
            expCategoryId,
            updatedData,
            { new: true }
          );
          return updatedEvent;
        }catch (e) {
            console.log(e);
            throw new Error(e);
        }
      }
    

      export const deleteexpCategory = async(expCategoryId)=>{
        try {
            const DeleteEvent = await ExpensesCategory.findByIdAndDelete(expCategoryId);
            if(!DeleteEvent) throw new Error(ERROR_MESSAGE.NOT_FOUND);
            const message = "Deleted Successfully"
            return message;
          }catch (e) {
              console.log(e);
              throw new Error(e);
          }
        }

        export const getExpCategoryById = async(eventId)=> {
            try {
              const event = await ExpensesCategory.findById(eventId);
                if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
              return event;
            }catch (e) {
                console.log(e);
                throw new Error(e);
            }
        }

        export const  getallexpCategory= async()=> {
             try {
            return ExpensesCategory.find();
        }
        catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }