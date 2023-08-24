const Donation = require("../models/donationDetail");
const ExpenseDetail = require('../models/expenseDetail');
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


export const getDayDonation = async () => {
  try {
    const todayDate = new  Date().toISOString();
    const [year, month, day] = todayDate.split('T')[0].split("-");
    const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
    const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
    const data = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate } });
    const sum = data.reduce((total,donation)=>total+donation.donationAmount, 0)
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const totaldayBalance = async () => {
  try {
    const todayDate = new  Date().toISOString();
    const [year, month, day] = todayDate.split('T')[0].split("-");
    const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
    const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
    const donation = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate } });
    const expenses = await ExpenseDetail.find({ expensesDate: { $gte: fromDate, $lte: toDate } });
    const donationSum = donation.reduce((total,donation)=>total+donation.donationAmount, 0)
    const expensesSum = expenses.reduce((total,donation)=>total+donation.expensesAmount, 0)
    console.log("expensesSum"+expensesSum)
    console.log("donationSum"+donationSum)
    const totalBalance = donationSum-expensesSum
    console.log(totalBalance);
    return totalBalance;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};


export const getTotalDonation = async () => {
  try { 
    const data = await Donation.find()
    const sum = data.reduce((total,donation)=>total+donation.donationAmount, 0)
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const totalBalance = async () => {
  try {
    const donation = await Donation.find();
    const expenses = await ExpenseDetail.find();
    const donationSum = donation.reduce((total,donation)=>total+donation.donationAmount, 0)
    const expensesSum = expenses.reduce((total,donation)=>total+donation.expensesAmount, 0)
    const totalBalance = donationSum-expensesSum
    console.log(totalBalance);
    return totalBalance;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};


export const totalCashBalance = async () => {
  try {
    const cashDonation = await Donation.find({donationMode: "cash"})
    const cashExpense = await ExpenseDetail.find({expensesPayemntType: "cash"})
    const donationSum = cashDonation.reduce((total,donation)=>total+donation.donationAmount, 0)
    const expensesSum = cashExpense.reduce((total,donation)=>total+donation.expensesAmount, 0)
    console.log("donationSum :"+donationSum)
    console.log("expensesSum :"+expensesSum)
    const totalCashBalance = donationSum-expensesSum
    return totalCashBalance;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const totalMothBalance = async (year) => { 
  try {
    if (typeof year !== "number" || isNaN(year)) {
      throw new Error("Invalid year format");
    }
    const donation = await DonationMonthWise(year)
    const expense = await ExpenseMonthWise(year)
    return {donation,expense};
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const DonationMonthWise = async (year) => {
  try{
    const donations = await Donation.aggregate([
      {
        $match: {
          donationDate: {
            $gte: new Date(`${year}-01-01T00:00:00Z`),
            $lt: new Date(`${year}-12-31T23:59:59.999Z`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$donationDate" } },
          donation: { $sum: '$donationAmount' }
        }
      },
      {
        $addFields: {
          monthNumber: "$_id.month",
          monthName: {
            $let: {
              vars: {
                monthsInString: [
                  "January", "February", "March", "April",
                  "May", "June", "July", "August",
                  "September", "October", "November", "December"
                ],
                monthIndex: { $subtract: ["$_id.month", 1] }
              },
              in: {
                $arrayElemAt: ["$$monthsInString", "$$monthIndex"]
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          monthNumber: 1,
          monthName: 1,
          donation: 1
        }
      },
      {
        $sort: { monthNumber: 1 }
      }
    ]);
    return donations;
  }
  catch (e) {
    console.log(e);
    throw new Error(e);
  }
}


const ExpenseMonthWise = async (year) => {
  try{
    const expneses = await ExpenseDetail.aggregate([
      {
        $match: {
          expensesDate: {
            $gte: new Date(`${year}-01-01T00:00:00Z`),
            $lt: new Date(`${year}-12-31T23:59:59.999Z`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$expensesDate" } },
          donation: { $sum: '$expensesAmount' }
        }
      },
      {
        $addFields: {
          monthNumber: "$_id.month",
          monthName: {
            $let: {
              vars: {
                monthsInString: [
                  "January", "February", "March", "April",
                  "May", "June", "July", "August",
                  "September", "October", "November", "December"
                ],
                monthIndex: { $subtract: ["$_id.month", 1] }
              },
              in: {
                $arrayElemAt: ["$$monthsInString", "$$monthIndex"]
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          monthNumber: 1,
          monthName: 1,
          donation: 1
        }
      },
      {
        $sort: { monthNumber: 1 }
      }
    ]);
    return expneses;
  }
  catch (e) {
    console.log(e);
    throw new Error(e);
  }
}