const mongoose = require('mongoose');
const Donation = require('../models/donationDetail');
const ObjectID = require('mongodb').ObjectId;



    export const addDonation= async (donationDetail)=> {
        try {
          const newDonation = await Donation.create(donationDetail);
          return newDonation;
        }  catch (e) {
            console.log(e);
            throw new Error(e);
        }
      }
    

 
      export const updateDonation= async(donationId, updatedData)=>{
        try {
          const updatedEvent = await Donation.findByIdAndUpdate(donationId,updatedData,{ new: true });
          return updatedEvent;
        }catch (e) {
            console.log(e);
            throw new Error(e);
        }
      }

      export const deleteDonation = async(donationId)=>{
        try {
          const DeleteEvent = await Donation.findByIdAndDelete(donationId);
          if(!DeleteEvent) throw new Error(ERROR_MESSAGE.NOT_FOUND);
          const message = "Deleted Successfully"
          return message;
        }catch (e) {
            console.log(e);
            throw new Error(e);
        }
      }
      
      export const getDoationById = async(donationId)=> {
        try {
          const event = await Donation.findById(donationId).populate('donarId')
          .populate('eventId')
          .populate('eventCategoryId')
          .populate('templeId');;
            if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
            return event;
        }catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
    

    export const getallDonation = async()=> {
        try {
            const event = await Donation.find()
            .populate('donarId')
            .populate('eventId')
            .populate('eventCategoryId')
            .populate('templeId');
              if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
            return event;
          }catch (e) {
              console.log(e);
              throw new Error(e);
          }
    }
    