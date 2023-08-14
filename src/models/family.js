const mongoose = require('mongoose');


const familySchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
    },
    dob: {
      type: Date,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true
    },
    occupation: {
      type: String,
    },
    aadharCardNo: {
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
    relation: {
      type: String,
    },
    user_detail: { type: mongoose.Schema.Types.ObjectId, ref: 'Donar' },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);





const Family = mongoose.model('Family', familySchema);

module.exports = Family;
