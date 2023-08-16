/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
import _ from "lodash";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";


const userSchema = mongoose.Schema(
  {
    loginId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phonenumber: {
      type: Number,
      required: true,
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
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "modified", deletedAt: "deleted" },
  }
);


userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.role) {
    const defaultRole = await mongoose.model('Role').findOne({ name: 'admin' });
    this.role = defaultRole ? defaultRole._id : null;
  }
  next();
});


userSchema.plugin(softDeletePlugin);
userSchema.index({'$**': 'text'});
userSchema.methods.getPublicData = function () {
  return _.omit(this.toObject({ virtuals: true }), [
    "__v",
    "created",
    "modified",
    "isDeleted",
    "deletedAt",
    "_id",
  ]);
};

const User = mongoose.model('User', userSchema);


module.exports = User;
