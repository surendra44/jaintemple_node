const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    refreshTokenExpiresAt: {
      type: Date,
      required: true,
    },
    accessToken: { // Make sure this field is defined properly
      type: String,
      required: true,
    },
  });
  
  const Token = mongoose.model('Token', tokenSchema);
  
  module.exports = Token;
  