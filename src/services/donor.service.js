const mongoose = require("mongoose");
const Donar = require("../models/donar");
const Family = require("../models/family");
import { ERROR_MESSAGE } from "../helpers/errorMessage";

export const registerDonor = async (userCreateadBy, members, mainDonarInfo) => {
  try {
    const newMainUser = await Donar.create(mainDonarInfo);
    const createFamilyMember = await createFamilyMembers(newMainUser._id,members,userCreateadBy);
    if (createFamilyMember.success) {
      const memberIds = createFamilyMember.data.map(
        (member) => new mongoose.Types.ObjectId(member._id)
      );
      Object.assign(newMainUser, { members: memberIds });
      newMainUser.save();
    }
    return {
      success: true,
      message: createFamilyMember.message,
      mainDonar: newMainUser,
      familyMembers: createFamilyMember,
    };
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

export const updateDonor = async (id,userCreateadBy,donorInfo,membersInfo) => {
  try {
    const filter = { _id: id };
    const update = { $set: donorInfo, updatedBy: userCreateadBy };
    const donar = await Donar.findOneAndUpdate(filter, update);
    let memberIds = [];
    const existingMembers = [];
    const newMembers = [];

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
    console.log("+++++++++++++++++++++");
    console.log(existingMembers);
    console.log("===========================");
    console.log(newMembers);

    if (existingMembers.length > 0) {
      for (const member of existingMembers) {
        const filter = { _id: { $in: memberIds } };
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

    return {
      success: true,
      message: "Donor updated successfully.",
      mainDonar: donar,
      familyMembers: memberIds,
    };
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

export const getAllDonorsWithMembers = async (paginationOptions,filter,sortBy) => {
  try {
    const { page, size } = paginationOptions;

    const totalDocuments = await Donar.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / size);
    const skip = (page - 1) * size;

    const result = await Donar.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(size)
      .populate("members");

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
