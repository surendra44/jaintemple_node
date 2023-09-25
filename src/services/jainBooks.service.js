import { ERROR_MESSAGE } from "../helpers/errorMessage";
const JainBook = require('../models/jainBooks');


export const saveBooks = async (jaiBookData) => {
    try {
        const newBook = new JainBook(jaiBookData);
        await newBook.save();
        return newBook
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};