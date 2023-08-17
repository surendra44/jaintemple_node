const mongoose = require('mongoose');
import httpStatus from "http-status";
const Donar = require('../models/donar');
const Family = require('../models/family');
import { successResponse, errorResponse } from "../helpers";
const { donorService } = require('../services');


export const registerDonor = async (req, res) => {
  const userCreateadBy = req.userId;
  console.log(userCreateadBy)
  const{ members,...rest } = req.body;
  try {
    const mainDonarInfo = { ...rest, createdBy: new mongoose.Types.ObjectId(userCreateadBy), updatedBy: new mongoose.Types.ObjectId(userCreateadBy) };
    const result = await donorService.registerDonor(userCreateadBy,members,mainDonarInfo);
    return successResponse(req, res, result);
  } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};


export const updateDonarInfo = async (req, res) => {
  const userCreateadBy = req.userId;
  const templeId = req.templeId;
  console.log(templeId)
  console.log("===========")
  console.log("===========")
  console.log(userCreateadBy)
  console.log("==============")
  const id = req.params.id
  const { members, ...rest } = req.body;
  const donorInfo = rest;
  const membersInfo = members;
  try {
      const result = await donorService.updateDonor(id,userCreateadBy,donorInfo, membersInfo);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  };


export const getAllDonors = async (req, res) => { try {
  const { page, size, search,sort } = req.query;

  const paginationOptions = {
    page: parseInt(page) || 1,
    size: parseInt(size) || 10,
  };

  const filter = {
    $or: [
      { firstName: { $regex: search || "", $options: "i" } },
      { "phoneNumbers.Phonenumber1": { $regex: search || "", $options: "i" } },
      { "phoneNumbers.Phonenumber2": { $regex: search || "", $options: "i" } },
    ],
  };

  const sortingOptions = sort ? sort.split(",") : ["_id", "asc"];
  const sortBy = { [sortingOptions[0]]: sortingOptions[1] };
  const result = await donorService.getAllDonorsWithMembers(paginationOptions,filter,sortBy);
  return successResponse(req, res, result);
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
}
};

export const getDonorById = async (req, res) => {
  const donorId = req.params.id;
  try {
    const donor = await donorService.getDonorByIdWithMembers(donorId);
    return successResponse(req, res, result);
  }catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const changeUserStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  const parentornot = req.body.isParent;
  try {
    const result = await donorService.changeUserStatus(id,status,parentornot);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};







// export const updateDonarInfo = async (req ,res) => {
//   const { donarInfo, membersInfo } = req.body;
//   const donar = await Donar.updateOne({ email: donarInfo.email, $set: donarInfo }); //expecting that we are not allowing email to change
//   if (membersInfo.length > 0) {
//     const result = await Promise.all(
//       membersInfo.map(async (member: any) => {
//         const filter = { email: member.email };
//         const update = { $set: member };
//         const options = { upsert: true, new: true };
//         const updateOrCreateMember = await Family.findOneAndUpdate(filter, update, options);
//         return updateOrCreateMember;
//       })
//     )
//   }
  
// }






// // const updateDonor = async (req, res) => {
// //   const donorCreateadBy = req.userId;
// //   const donorId  = req.params.id;
// //   const { members, ...rest } = req.body;
// //   const mainDonarInfo = { ...rest, updatedBy: new mongoose.Types.ObjectId(donorCreateadBy) };
// //   try {
// //     const updatedDonor = await Donar.findByIdAndUpdate(
// //       donorId,
// //       { $set: { ...rest } },
// //       { new: true }
// //     );
// //     const membersInfo = members.map((member) => ({ ...member, user_detail: donorId }));
// //     console.log(membersInfo)
// //     res.json({ message: 'Donor updated successfully', donor: updatedDonor });
// //   }
// //   catch(error){
// //    console.log(error)
// //   }
// // };



// const updateDonor = async (req, res) => {
//   const donorId = req.params.id;
//   const { members, ...rest } = req.body;

//   try {
//     const updatedDonor = await Donar.findByIdAndUpdate(
//       donorId,
//       { $set: { ...rest } },
//       { new: true }
//     );

//     if (members) {
//       await Family.deleteMany({ user_detail: donorId });
//       const membersInfo = members.map((member) => ({
//         ...member,
//         user_detail: donorId,
//       }));
//       await Family.insertMany(membersInfo);

//       // If you want to assign updated members to the donor object, you can do so here
//       updatedDonor.members = membersInfo.map((member) => member._id);
//       await updatedDonor.save();
//     }

//     res.json({ message: 'Donor updated successfully', donor: updatedDonor });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };





