const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  title: {
    type: String, 
    required: true,
    maxlength: 250,
  },
  article: {
    type: String, 
    required: true,
    maxlength: 750,
  }, 
  tags: Array, 
  date: Date,
}, { timestamps: true, });