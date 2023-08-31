const mongoose = require('mongoose');


const donerSchema = mongoose.Schema(
    {
        image: {
            type: String,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        phoneNumbers: [
            {
                Phonenumber1: String,
                Phonenumber2: String
            }
        ],
         
        dob: {
            type: Date,
          
        }, 
        dateOfAnniversary:{
            type: Date,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        occupation: {
            type: String,
        },
        aadharNo: {
            type: String,
        },
        aadharCardImage: {
            type: String,
        },
        bloodGroup: {
            type: String,
        },
        address: {
            line_1: { type: String },
            line_2: String,
            line_3: String,
            city: { type: String },
            state: { type: String },
            pincode: { type: Number },
            country: { type: String },
        },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Family' }],
        isHead: {
            type: Boolean,
            default: false,
        },
        gotr: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isRegister: {
            type: Boolean,
            default: true,
        },
        createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        updatedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
    {
        timestamps: true,
    }
);




const Donar = mongoose.model('Donar', donerSchema);

module.exports = Donar;