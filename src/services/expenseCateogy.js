
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


      export const updateEventDetail= async(eventcategoryId, updatedData)=>{
        try {
          const updatedEvent = await EventDetail.findByIdAndUpdate(
            eventcategoryId,
            updatedData,
            { new: true }
          );
          return updatedEvent;
        }catch (e) {
            console.log(e);
            throw new Error(e);
        }
      }
    
