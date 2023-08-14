import { User } from "../models/index";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const Role = require('../models/role');

export const createRole = async (roleData) => {
    try {
        const newRole = new Role(roleData);
        return newRole.save();
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

export const getRoleById = async (id) => {
    try {
        return Role.findById(id);
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

export const getAllRoles = async () => {
    try {
        return Role.find();
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

