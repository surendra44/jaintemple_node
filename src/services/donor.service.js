const mongoose = require("mongoose");
const Donar = require("../models/donar");
const Family = require("../models/family");
const Donation = require("../models/donationDetail")
import { ERROR_MESSAGE } from "../helpers/errorMessage";

export const registerDonor = async (userCreateadBy, members, mainDonarInfo) => {
  try {
    const newMainUser = await Donar.create(mainDonarInfo);
    let createFamilyMember = [];
    if (members) {
      if (members.length > 0) {
        createFamilyMember = await createFamilyMembers(
          newMainUser._id,
          members,
          userCreateadBy
        );
        if (createFamilyMember.success) {
          const memberIds = createFamilyMember.data.map(
            (member) => new mongoose.Types.ObjectId(member._id)
          );
          Object.assign(newMainUser, { members: memberIds });
          newMainUser.save();
        }
      }
    }
    const result = { success: true, mainDonar: mainDonarInfo };
    if (members) {
      if (members.length > 0) result["familyMembers"] = createFamilyMember;
    }
    return result;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
export const createFamilyMembers = async (userId, members, userCreateadBy) => {
  const membersInfo = members.map((member) => ({
    ...member,
    user_detail: new mongoose.Types.ObjectId(userId),
    createdBy: new mongoose.Types.ObjectId(userCreateadBy),
    updatedBy: new mongoose.Types.ObjectId(userCreateadBy),
  }));
  try {
    const result = await Family.insertMany(membersInfo);
    return { success: true, data: result, message: "" };
  } catch (error) {
    return {
      success: false,
      message:
        "There was a problem adding members please check the info again.",
    };
  }
};


export const registerGuest = async (donationInfo,mainDonarInfo) => {
  try {
    const newMainUser = await Donar.create(mainDonarInfo);
    const donarId = newMainUser._id
    console.log(newMainUser._id);
    let result = { success: true, mainDonar: mainDonarInfo };
    if (donationInfo && donationInfo.donationAmount > 0) {
         const donation = await createDonation({...donationInfo,donarId});
          result = {...result ,donation}
    }
    return result;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const createDonation= async (donationInfo ) => {
  try {
    const result = await Donation.create(donationInfo);
    return { success: true, data: result, message: "" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        "There was a problem adding donation please check the info again.",
    };
  }
};

export const updateDonor = async (
  id,
  userCreateadBy,
  donorInfo,
  membersInfo
) => {
  try {
    const donar = await Donar.findOne({ _id: id });
    if (!donar) {
      throw new Error(ERROR_MESSAGE.NOT_FOUND);
    }
    Object.assign(donar, { ...donorInfo, updatedBy: userCreateadBy });
    await donar.save();
    let memberIds = [];
    if (membersInfo) {
      let existingMembers = [];
      let newMembers = [];

      if (membersInfo.length > 0) {
        for (const member of membersInfo) {
          if (member._id) {
            existingMembers.push({ ...member, updatedBy: userCreateadBy });
            memberIds.push(member._id);
          } else {
            newMembers.push({
              ...member,
              updatedBy: userCreateadBy,
              createdBy: userCreateadBy,
              user_detail: id,
            });
          }
        }

        if (existingMembers.length > 0) {
          for (const member of existingMembers) {
            const filter = { _id: member._id };
            delete member._id;
            const update = { $set: member };
            await Family.updateOne(filter, update);
          }
        }

        if (newMembers.length > 0) {
          const newfamilymember = await Family.insertMany(newMembers);
          newfamilymember.map((member) => memberIds.push(member._id));
        }

        Object.assign(donar, { members: memberIds });
        await donar.save();
      }
    }

    const result = { success: true, mainDonar: donar };

    if (membersInfo) {
      if (membersInfo.length > 0) result["familyMembers"] = memberIds;
    }

    return result;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const changeUserStatus = async (id, status, parentornot) => {
  try {
    if (parentornot) {
      const donor = await Donar.findById(id);
      if (!donor) {
        throw new Error(`User not found with supplied Id' `);
      }
      await Donar.updateOne({ _id: id }, { $set: { isActive: status } });
      const memebers = donor.members;
      for (const member of memebers) {
        await Family.updateOne({ _id: member }, { $set: { isActive: status } });
      }
    } else {
      await Family.updateOne({ _id: id }, { $set: { isActive: status } });
    }

    let message;
    if (status == "true") {
      message = "memeber is activated";
    } else {
      message = "memeber is Deactivated";
    }
    return { message };
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllDonorsWithMembers = async (paginationOptions, filter, sortBy) => {
  try {
    const { page, size } = paginationOptions;

    const totalDonarCount = await Donar.countDocuments(filter);
    const totalFamiliesCount = await Family.countDocuments(filter);
    const totalDocuments = totalDonarCount + totalFamiliesCount;
    const totalPages = Math.ceil(totalDocuments / size);
    const skip = (page - 1) * size;

    const donorsQuery = Donar.find(filter).sort(sortBy).skip(skip).populate("members");

    // Check if size is provided and greater than 0, otherwise retrieve all documents
    if (size && size > 0) {
      donorsQuery.limit(size);
    }

    const donors = await donorsQuery;

    let result = donors;
    let familyLimit = 0;
    let familySkip = 0;

    if (donors.length < size) {
      familyLimit = size - donors.length;

      if (donors.length === 0) {
        familyLimit = 15;
      } else {
        const donorCount = donors.length;
        const remainingFamilyRecords = size - donorCount;
        familySkip = remainingFamilyRecords > 0 ? remainingFamilyRecords : 0;
      }
    }

    const families = await Family.find(filter).sort(sortBy).skip(familySkip);

    if (result.length + families.length > size) {
      const remainingSpace = size - result.length;
      result = result.concat(families.slice(0, remainingSpace));
    } else {
      result = result.concat(families);
    }

    return {
      page,
      size,
      data: result,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      totalDocuments,
    };
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

// fghdfhdfhfgd

export const getDonorByIdWithMembers = async (donorId) => {
  try {
    const donor = await Donar.findById(donorId)
      .select("-createdBy -updatedBy -__v  -createdAt -updatedAt ")
      .populate({
        path: "members",
        select:
          "-createdBy -updatedBy  -user_detail -__v -createdAt   -updatedAt -address    ",
      });
    if (!donor) throw new Error(ERROR_MESSAGE.DONAR.GetID);
    return donor;
  } catch (error) {
    throw new Error("Unable to fetch donor by ID");
  }
};

export const getDayDonor = async () => {
  try {
    const todayDate = new  Date().toISOString();
    const [year, month, day] = todayDate.split('T')[0].split("-");
    const fromDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
    const toDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999));
    const data = await Donar.find({ createdAt: { $gte: fromDate, $lte: toDate } });
   const sumofDonar = data.length
    console.log(data);
    return sumofDonar;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};



export const getTotalDonarCount = async () => {
  try { 
    const result = await Donar.find()
    const sum = result.length
    return sum;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};