const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

module.exports = new Schema({
  longUrl: {
    type: String,
    maxlength: 500,
  },
  shortUrl: {
    type: String,
    maxlength: 500,
  // },
  // email: {
  //   type: String,
  //   maxlength: 250,
  // },
  // password: {
  //   type: String,
  //   maxlength: 250,
  // },
  // expiredDate: Date,
  // accountType: {
  //   type: String,
  //   enum: [
  //     'free',
  //     'premium',
  //     'trial',
  //   ],
  // }, 
}, {
  timestamps: true,
});