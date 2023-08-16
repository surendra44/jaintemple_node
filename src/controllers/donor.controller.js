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

// const updateDonor = async (req, res) => {
//   const donorId = req.params.id;
//   const { donorData, memberData } = req.body;
//   try {
//     const result = await donorService.updateDonorAndMembers(donorId, donorData, memberData);
//     res.json(result);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };



export const updateDonarInfo = async (req, res) => {
  const userCreateadBy = req.userId;
  console.log(userCreateadBy)
  const id = req.params.userId
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


// sddsdfdf


export const getAllDonors = async (req, res) => {
  try {
    const result = await donorService.getAllDonorsWithMembers();
    return successResponse(req, res, result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDonorById = async (req, res) => {
  const donorId = req.params.id;
  try {
    const donor = await donorService.getDonorByIdWithMembers(donorId);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    res.json({ donor });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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





