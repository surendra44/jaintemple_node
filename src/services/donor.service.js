const mongoose = require('mongoose');
const Donar = require('../models/donar');
const Family = require('../models/family');
const ObjectID = require('mongodb').ObjectId;


const registerDonor =async (userCreateadBy,members,mainDonarInfo) => {
  try{
  const newMainUser = await Donar.create(mainDonarInfo);
  const createFamilyMember = await createFamilyMembers(newMainUser._id, members, userCreateadBy);
  if (createFamilyMember.success) {
    const memberIds = createFamilyMember.data.map((member) => new mongoose.Types.ObjectId(member._id));
    Object.assign(newMainUser, { members: memberIds });
    newMainUser.save();
  }
  return({ success: true,message: createFamilyMember.message, mainDonar: newMainUser, familyMembers: createFamilyMember });
  }catch (e) {
    console.log(e);
    throw new Error(e);
}

}

const createFamilyMembers = async (userId, members,userCreateadBy) => {
       const membersInfo = members.map((member) =>({...member, user_detail: new mongoose.Types.ObjectId(userId),
        createdBy: new mongoose.Types.ObjectId(userCreateadBy), updatedBy: new mongoose.Types.ObjectId(userCreateadBy)}));
      try {
          const result = await Family.insertMany(membersInfo);
          return ({ success: true, data: result, message: '' });
      } catch (error) {
          return ({ success: false, message: 'There was a problem adding members please check the info again.' });
      }
  }


const updateDonor = async (id ,userCreateadBy,donorInfo, membersInfo) => {
    try{
        console.log(donorInfo);
        const filter = { _id: id };
        const update = { $set: donorInfo,updatedBy: userCreateadBy };
        console.log(id);
    const donar = await Donar.findOneAndUpdate( filter,update); 
    console.log(donar);
    let result = [];
  if (membersInfo.length > 0) {
     result = await Promise.all(
      membersInfo.map(async (member) => {
        const filter = { phoneNumber: member.phoneNumber };
        const update = {
          $set: {
            ...member,
            user_detail: donar._id,
            ...(member._id
              ? { updatedBy: userCreateadBy ,createdBy : userCreateadBy}
              : { updatedBy: userCreateadBy }),
          },
        };
        const options = { upsert: true, new: true };
        const updateOrCreateMember = await Family.findOneAndUpdate(filter, update, options);
        console.log('Member processed:', updateOrCreateMember);
        return updateOrCreateMember;
      })
    )
    console.log('Processed members:', result);
    const memberIds = result.map(member => member._id);
    console.log(memberIds);
    Object.assign(donar, { members: memberIds });
    await donar.save();
  }
       result = { success: true, message: 'Donor updated successfully.', mainDonar: donar, familyMembers: result };
       return result;
    }  catch (e) {
      console.log(e);
      throw new Error(e);
  }
  };


// const createFamilyMembers = async (userId, members) => {
//     const membersInfo = members.map((member) =>({...member, user_detail: userId}));
//     try {
//         const result = await Family.insertMany(membersInfo);
//         return ({ success: true, data: result, message: '' });
//     } catch (error) {
//         retunr ({ success: false, message: 'There was a problem adding members please check the info again.' });
//     }
// }


// const updateDonorAndMembers = async (donorId, donorData, memberData) => {
//     try {
//       const updatedDonor = await Donar.findByIdAndUpdate(
//         donorId,
//         { $set: { ...donorData } },
//         { new: true }
//       );
  
//       if (memberData.length > 0) {
//         await Family.deleteMany({ user_detail: donorId });
  
//         const membersInfo = memberData.map((member) => ({ ...member, user_detail: donorId }));
//         await Family.insertMany(membersInfo);
//       }
  
//       return { success: true, message: 'Donor and family members updated successfully', donor: updatedDonor };
//     } catch (error) {
//       return { success: false, message: 'Error updating donor and family members', error: error.message };
//     }
//   };




  const getAllDonorsWithMembers = async () => {
  try {
    const result = await Donar.find().populate('members');
    return result;
  } catch (e) {
    console.log(e);
    throw new Error(e);
}
};
// fghdfhdfhfgd

const getDonorByIdWithMembers = async (donorId) => {
    try {
      const donor = await Donar.findById(donorId).select('-createdBy -updatedBy -__v  -IsActive -createdAt -updatedAt ').populate({
        path: 'members',
        select: '-createdBy -updatedBy  -_id -isActive -user_detail -__v -createdAt   -updatedAt -address    ',
      });
      return donor;
    } catch (error) {
      throw new Error('Unable to fetch donor by ID');
    }
  };
  
module.exports = {
  registerDonor,
  updateDonor,
  getAllDonorsWithMembers,
  getDonorByIdWithMembers
};
