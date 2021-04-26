const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

module.exports = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 250,
  },
  surname: {
    type: String,
    maxlength: 250,
  },
  birth: Date,
  exp: Number, //стаж в годах
  role: {
    type: String,
    enum: [
      'worker',
      'engineer',
      'welder',
      'chief engineer',
      'fitter',
      'security',
      'accountant',
      'economist',
    ],
  }, //должность
  salary: Number,
  stage: Number, //смена
  childs: [{
    name: {
      type: String,
      maxLength: 250,
    },
    age: Number,
  }],
  transportation: Boolean,
}, {
  timestamps: true,
});