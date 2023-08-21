const Donation = require("../models/donationDetail");
import { ERROR_MESSAGE } from "../helpers/errorMessage";


export const addDonation = async (donationDetail) => {
  try {
    const newDonation = await Donation.create(donationDetail);
    return newDonation;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const updateDonation = async (donationId, updatedData) => {
  try {
    const updatedEvent = await Donation.findByIdAndUpdate(
      donationId,
      updatedData,
      { new: true }
    );
    return updatedEvent;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const deleteDonation = async (donationId) => {
  try {
    const DeleteEvent = await Donation.findByIdAndDelete(donationId);
    if (!DeleteEvent) throw new Error(ERROR_MESSAGE.DONATION.Delete);
    const message = "Deleted Successfully";
    return message;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getDoationById = async (donationId) => {
  try {
    const event = await Donation.findById(donationId)
      .populate("donarId")
      .populate("eventId")
      .populate("eventCategoryId")
      .populate("templeId");
    if (!event) throw new Error(ERROR_MESSAGE.DONATION.GetID);
    return event;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getallDonation = async (paginationOptions,filter,sortBy) => {
  try {
    const { page, size } = paginationOptions;

    const totalDocuments = await Donation.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / size);
    const skip = (page - 1) * size;

    const result = await Donation.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(size)
      .populate("eventId")
      .populate("eventCategoryId");

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
};
