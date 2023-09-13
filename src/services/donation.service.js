const Donation = require("../models/donationDetail");
const Donar = require("../models/donar");
const DailyCategoryEvent = require("../models/dailyCategory");
const EventCategory = require("../models/eventCategory");
const ExpenseDetail = require('../models/expenseDetail');
const EventDetail = require('../models/eventDetail');
// const wbm = require('wbm');
import pdf from 'html-pdf';
import ejs from 'ejs';
import path from 'path';
import * as fs from 'fs-extra';
import axios from "axios";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
import { dailyEventService } from '.';



export const addDonation = async (donationDetail) => {
  try {
    const newDonation = await Donation.create(donationDetail);
    const result = await getDoationById(newDonation._id);
    // const receipt = await sendRecipt(result._id);
    return result;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
  
};

const getCategoryName = (categories, categoryId) => {
  console.log(categories, categoryId);
  return  categories.find((category) => category._id.toString() === categoryId.toString()).name;
  
}



export const sendRecipt = async (donationId) => {
  try {
    let data = [];
    const donationDetail = await Donation.findById({ _id: donationId }).populate("templeId").populate("donarId");
    const eventId =donationDetail.eventId ;
    console.log(eventId,"===========================");
    const dailyCategories = await DailyCategoryEvent.find();
    const events = await EventDetail.find();
    console.log(events);
    const categories = await EventCategory.find();
    let eventName = donationDetail.eventId === null ? "Daily" : events.find((event) => event._id.toString() === eventId.toString()).eventName ;
    

    if (donationDetail.eventId === null) {
      const transactions = donationDetail.dailyEvent;
      data = transactions.map((transaction) => ({ name: getCategoryName(dailyCategories, transaction.dailyEventCategory), amount: transaction.donateEventAmount }))
    } else {
      data = [{ amount: donationDetail.donationAmount, name:donationDetail.eventCategoryId ? getCategoryName(categories, donationDetail.eventCategoryId):''}];
    }
    const templeAddress = [
      donationDetail.templeId.address.line_1,
      donationDetail.templeId.address.city,
      donationDetail.templeId.address.pincode,
      donationDetail.templeId.address.country,
    ].filter(Boolean).join(' ');

    const dynamicData = {
      templeName: donationDetail.templeId.name,
      templeAddress: templeAddress,
      donorName: donationDetail.donarId.firstName,
      donarAmount: donationDetail.donationAmount,
      mode: donationDetail.donationMode,
      eventName:eventName,
      receiptName:donationDetail.receiptName,
      data
    }
    const { pdfBuffer } = await generatePDFReceipt(dynamicData); // Destructure the result
    return  dynamicData ;
  } catch (e) {
    console.error(e);
    res.status(500).send('Error processing donation');
  }
};

const generatePDFReceipt = async (dynamicData) => {
  try {
    const html = await ejs.renderFile(path.join(__dirname, '../template/billing.ejs'), { data: dynamicData });

    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(html).toBuffer((err, buffer) => {
        if (err) {
          console.error(err);
          reject('Error generating PDF');
        } else {
          resolve(buffer);
        }
      });
    });

    // Save the PDF to a file
    fs.writeFileSync(path.join(__dirname, '../template/donation_receipt.pdf'), pdfBuffer);

    return { dynamicData, pdfBuffer };
  } catch (e) {
    console.error(e);
    throw new Error('Error generating or saving PDF');
  }
};






// const generateAndSendPDF = async (donationDetail, donorEmail) => {
//   try {
//     // Generate the PDF
//     const pdfDoc = await pdfLib.PDFDocument.create();
//     const page = pdfDoc.addPage([600, 400]);
//     const content = page.drawText(`Donation Details:\n\n${JSON.stringify(donationDetail)}`);
    
//     // Save the PDF to a buffer
//     const pdfBytes = await pdfDoc.save();

//     // Create a transporter for sending emails
//     const transporter = nodemailer.createTransport({
//       service: 'your_email_service',
//       auth: {
//         user: 'your_email@example.com',
//         pass: 'your_email_password',
//       },
//     });

//     // Configure email data
//     const mailOptions = {
//       from: 'your_email@example.com',
//       to: donorEmail,
//       subject: 'Donation Receipt',
//       text: 'Thank you for your donation!',
//       attachments: [
//         {
//           filename: 'donation_receipt.pdf',
//           content: pdfBytes,
//         },
//       ],
//     };

//   }
// }

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

    const result = await Donation.find()
      .sort(sortBy)
      .skip(skip)
      .limit(size)
      .populate("eventId")
      .populate("eventCategoryId")
      .populate("donarId");

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


export const  getallPendingDonation = async (paginationOptions,filter,sortBy) => {
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
      .populate("eventCategoryId")
      .populate("donarId");

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
    const data = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate },donationStatus:"Complete" });
    const sum = data.reduce((total,donation)=>total+donation.donationAmount, 0)
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getDayCashDonation = async () => {
  try {
    const todayDate = new  Date().toISOString();
    const [year, month, day] = todayDate.split('T')[0].split("-");
    const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
    const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
    const data = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate },donationMode:"Cash" });
    const sum = data.reduce((total,donation)=>total+donation.donationAmount, 0)
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getbyDayOnlineDonation = async () => {
  try {
    const todayDate = new  Date().toISOString();
    const [year, month, day] = todayDate.split('T')[0].split("-");
    const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
    const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
    const data = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate },donationMode:"Online" });
    const sum = data.reduce((total,donation)=>total+donation.donationAmount, 0)
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

export const  getbyDaychequeDonation = async () => {
  try {
    const todayDate = new  Date().toISOString();
    const [year, month, day] = todayDate.split('T')[0].split("-");
    const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
    const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
    const data = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate },donationMode:"Cheque" });
    const sum = data.reduce((total,donation)=>total+donation.donationAmount, 0)
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}


export const getbyDayPendingDonation = async () => {
  try {
    const todayDate = new  Date().toISOString();
    const [year, month, day] = todayDate.split('T')[0].split("-");
    const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
    const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
    const data = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate },donationStatus:"Pending" });
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
    const donation = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate },donationStatus:"Complete" });
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


export const todayCashBalance = async () => {
  try {
    const todayDate = new  Date().toISOString();
    const [year, month, day] = todayDate.split('T')[0].split("-");
    const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
    const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
    const donation = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate },donationStatus:"Complete",donationMode: "Cash" });
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

export const todayOnlineBalance = async () => {
  try {
    const todayDate = new  Date().toISOString();
    const [year, month, day] = todayDate.split('T')[0].split("-");
    const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
    const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
    const donation = await Donation.find({ donationDate: { $gte: fromDate, $lte: toDate },donationStatus:"Complete",donationMode: "Online" });
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
    const data = await Donation.find({donationStatus:"Complete"})
    const sum = data.reduce((total,donation)=>total+donation.donationAmount, 0)
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const totalOnlineDonation = async () => {
  try { 
    const data = await Donation.find({donationStatus:"Complete",donationMode:"Online"})
    const sum = data.reduce((total,donation)=>total+donation.donationAmount, 0)
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const totalCashDonation = async () => {
  try { 
    const data = await Donation.find({donationStatus:"Complete",donationMode:"Cash"})
    const sum = data.reduce((total,donation)=>total+donation.donationAmount, 0)
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const totalbyEventDonation = async (eventId) => {
  try { 
    const data = await Donation.find({ donationStatus: "Complete", donationMode: "Cash", eventId: eventId });
    const sum = data.reduce((total, donation) => total + donation.donationAmount, 0);
    console.log(sum);
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const  totalByDailyEventCategory  = async (eventId) => {
  try { 
    const data = await Donation.find({ donationStatus: "Complete" });
    let totalAmount = 0;
    console.log(data);
    for (const donation of data) {
      if (donation.dailyEvent && Array.isArray(donation.dailyEvent)) {
        console.log("Donation with dailyEvent found:", donation);
        const matchingEvents = donation.dailyEvent.filter(
          (dailyEvent) => dailyEvent.dailyEventCategory.toString() === eventId.toString()
        );
        console.log("Matching Events:", matchingEvents);
        if (matchingEvents.length > 0) {
          const eventTotal = matchingEvents.reduce(
            (sum, dailyEvent) => sum + dailyEvent.donateEventAmount,
            0
          );
          console.log(`Event Total for Event ID ${eventId}: ${eventTotal}`);
          totalAmount += eventTotal;
          console.log(totalAmount,"=======")
        }
        // else{
        //   console.log("=======")
        //   let result = await totalbyEventCategory(eventId)
        //   return result;
        // }
      }
    }
    console.log(`Total Cash Donation for Event ID ${eventId}: ${totalAmount}`);
    return totalAmount;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};


export const totalByAllDailyEventCategories = async (paginationOptions, filter, sortBy) => {
  try {
    const { page, size } = paginationOptions;

    // Find all daily event categories
    const dailyEventCategories = await DailyCategoryEvent.find({}, "name");

    const totalDocuments = dailyEventCategories.length;
    const totalPages = Math.ceil(totalDocuments / (size || totalDocuments)); // If size is not provided or invalid, return all data
    const skip = (page - 1) * (size || totalDocuments); // If size is not provided or invalid, skip 0 documents

    // Paginate the daily event categories
    const paginatedCategories = dailyEventCategories
      .slice(skip, skip + (size || totalDocuments))
      .map(async (category) => {
        // Find donations for the current category
        const donationsForCategory = await Donation.find({
          donationStatus: "Complete",
          "dailyEvent.dailyEventCategory": category._id,
        });

        // Calculate the total donation amount for the category
        const totalAmount = donationsForCategory.reduce(
          (total, donation) =>
            total +
            (donation.dailyEvent || []).reduce(
              (categoryTotal, dailyEvent) =>
                categoryTotal +
                (dailyEvent.dailyEventCategory.toString() === category._id.toString()
                  ? dailyEvent.donateEventAmount
                  : 0
                ),
              0
            ),
          0
        );

        return {
          name: category.name,
          totalamount: totalAmount,
        };
      });

    // Wait for all promises to resolve
    const result = await Promise.all(paginatedCategories);

    console.log("Total Amounts for Daily Event Categories:");
    console.log(result);

    return {
      page,
      size: size || totalDocuments, // If size is not provided or invalid, return all data
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


export const totalByAllEventCategories = async (paginationOptions, filter, sortBy) => {
  try {
    const { page, size } = paginationOptions;

    // Find all event categories
    const eventCategories = await EventCategory.find({}, "name");

    const totalDocuments = eventCategories.length;
    const totalPages = Math.ceil(totalDocuments / (size || totalDocuments)); // If size is not provided or invalid, return all data
    const skip = (page - 1) * (size || totalDocuments); // If size is not provided or invalid, skip 0 documents

    // Paginate the event categories
    const paginatedCategories = eventCategories
      .slice(skip, skip + (size || totalDocuments))
      .map(async (category) => {
        try {
          // Find donations for the current event category
          const donationsForCategory = await Donation.find({
            donationStatus: "Complete", // Corrected spelling
            eventCategoryId: category._id,
          });

          // Calculate the total donation amount for the category
          const totalAmount = donationsForCategory.reduce(
            (total, donation) => total + donation.donationAmount,
            0
          );

          return {
            name: category.name,
            totalamount: totalAmount,
          };
        } catch (error) {
          console.error(`Error while processing category ${category.name}: ${error.message}`);
          return {
            name: category.name,
            totalamount: 0, // Set total to 0 for categories with errors
          };
        }
      });

    // Wait for all promises to resolve
    const result = await Promise.all(paginatedCategories);

    console.log("Total Amounts for Event Categories:");
    console.log(result);

    return {
      page,
      size: size || totalDocuments, // If size is not provided or invalid, return all data
      data: result,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      totalDocuments,
    };
  } catch (e) {
    console.error(`Error: ${e.message}`);
    throw new Error(e);
  }
};



export const totalbyEventCategory = async (eventCategoryId) => {
  try {
    const data = await Donation.find({
      donationStatus: "Complete",
      eventCategoryId: eventCategoryId,
    });

    let totalAmount = 0;

    for (const donation of data) {
      totalAmount += donation.donationAmount;
    }

    console.log(`Total Cash Donation for Event Category ID ${eventCategoryId}: ${totalAmount}`);
    return totalAmount;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};


export const totalBalance = async () => {
  try {
    const donation = await Donation.find({donationStatus:"Complete"});
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


export const totalPendingBalance = async () => {
  try {
    const cashDonation = await Donation.find({donationStatus: "Pending"})
    // const cashExpense = await ExpenseDetail.find({expensesPayemntType: "Pending"})
    const donationSum = cashDonation.reduce((total,donation)=>total+donation.donationAmount, 0)
    // const expensesSum = cashExpense.reduce((total,donation)=>total+donation.expensesAmount, 0)
    console.log("donationSum :"+donationSum)
    // console.log("expensesSum :"+expensesSum)
    const totalCashBalance = donationSum
    return totalCashBalance;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};


export const totalCashBalance = async () => {
  try {
    const cashDonation = await Donation.find({donationStatus:"Complete",donationMode: "Cash"})
    const cashExpense = await ExpenseDetail.find({expensesPayemntType: "Cash"})
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

export const totalOnlineBalance = async () => {
  try {
    const cashDonation = await Donation.find({donationStatus:"Complete",donationMode: "Online"})
    const cashExpense = await ExpenseDetail.find({expensesPayemntType: "Online"})
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


const whatsAppAPI = async (phoneNumber) => {
  try{
    const token = 'Bearer EAASFDxeVDa8BOx4rdptrjKLN2ni7aWGHHw5LxcBIhrPkw9hRs6UCeWyYMv9Mfgny4mVcZB8dZBA0gZCoofXZBJjLNVFH1bENgoXnOqX8vTJrRWrJ7kRsKoLrLJ7HmNhM2J3GDcexcJFxZAcd2mRZABWVzSLp4d0PZAxNOSZAbkt3gZBTXgZA8TghZBnV69LWVfIU1MDuLkrQymVx43gwEZBabWYHOZAbwGM2l0JQZD';
    const url = ' https://graph.facebook.com/v17.0/117997141392720/messages';
    const options = {
      url,
      method: 'POST',
      data: { 
        messaging_product: 'whatsapp',
        to: '8955951095' ,
        type: 'template',
        template: {
          name: 'hello_world',
          language: { code: 'en_US' }
        }
      },
      headers: {
        Authorization: token
      }
    }
    const result = await axios(options);
    console.log(result)
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}


// asdfsdsdafsd


export const top15MaxDonar = async () => {
  try{
const resutl = await Donation.aggregate([
  // Match documents where donationStatus is "Pending" (or any other condition you prefer)
  {
      $match: {
          donationStatus: "Done"
      }
  },
  // Group documents by donorId and calculate the total donationAmount for each donor
  {
      $group: {
          _id: "$donarId",
          totalDonationAmount: { $sum: "$donationAmount" }
      }
  },
  // Sort the donors by totalDonationAmount in descending order
  {
      $sort: {
          totalDonationAmount: -1
      }
  },
  // Limit the result to the top 2 donors
  {
      $limit: 15
  }
])


  return resutl;
  }  catch (e) {
    console.log(e);
    throw new Error(e);
  }
}
