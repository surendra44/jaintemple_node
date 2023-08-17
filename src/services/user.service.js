import { Console } from "winston/lib/winston/transports";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const mongoose = require('mongoose')
const Role = require('../models/role');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth_utilities = require("../helpers/auth_utilities")


export const addUser = async function (body) {
    try {
        const roleName = body.role;
        const role = await Role.findOne({ name: roleName });
        console.log(role)
        if (!role) {
            throw new Error(`Role '${roleName}' not found. Admin cannot be created.`);
        }
        console.log(body);
        const newAdmin = new User({
            name: body.name,
            phonenumber: body.phonenumber,
            address: body.address,
            loginId: body.loginId,
            email: body.email,
            password: body.password,
            temple: new mongoose.Types.ObjectId(body.temple),
            role: role._id,
          });
        await newAdmin.save();
        const result = await getUserById(newAdmin._id);
        return result;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};


export const getUserById = async (userId) => {
    try {
        let result = await User.findOne({_id:userId});
        if(!result) throw new Error(ERROR_MESSAGE.ADMIN.NOT_FOUND);
        return result;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};



export const loginUser = async (loginId, password) => {
    try {
      const user = await User.findOne({ loginId });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error('Incorrect password');
      }
      console.log(user._id);
      console.log("============");
      const accessToken = auth_utilities.createUserToken(user);
      return {
        message: 'Login successful',
        user: {
          _id: user._id,
          name: user.name,
          role:user.role._id,
          templeId: user.temple
        },
        accessToken,
      };
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
  };

  
export const updateUser = async function (userId, updatedUserData) {
  try {
    const roleName = updatedUserData.role;
    console.log(userId);
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      throw new Error(`Role '${roleName}' not found. Admin cannot be created.`);
    }
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error(`User with ID '${userId}' not found.`);
    }
    existingUser.name = updatedUserData.name;
    existingUser.phonenumber = updatedUserData.phonenumber;
    existingUser.address = updatedUserData.address;
    existingUser.loginId = updatedUserData.loginId;
    existingUser.email = updatedUserData.email;
    existingUser.password = updatedUserData.password;
    existingUser.role = role._id;

    await existingUser.save();
    const result = await getUserById(existingUser._id);
    return result;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};