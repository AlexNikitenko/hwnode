const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

module.exports = new Schema({
  email: {
    type: String,
    maxlength: 250,
  },
  password: {
    type: String,
    maxlength: 250,
  },
  fullUrl: {
    type: String,
    maxlength: 250,
    required: true,
  },
  shortUrl: {
    type: String,
    maxlength: 250,
  },
  expiredDate: Date,
  accountType: {
    type: String,
    enum: [
      'free',
      'premium',
      'trial',
    ],
  }, 
}, {
  timestamps: true,
});