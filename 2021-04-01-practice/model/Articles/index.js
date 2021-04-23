const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');
const moment = require('moment');


generalSchema.statics.findUsersBySalaryFromTo = async function (from, to) {
  const users = await this.find({
    salary: {
      $gte: from,
      $lte: to
    }
  });
  return users;
};

generalSchema.statics.addNewUser = async function (userObj) {
  const user = await this.create({
    userObj
  });
  return user;
};

generalSchema.statics.deleteUserByEmail = async function (email) {
  const user = await this.findOneAndDelete({
    email
  });
  return user;
};

generalSchema.statics.getUsersByAgeFromTo = async function (from, to) {
  const users = await this.find({
    moment(birth).toNow(true).split(' ')[0]: {
      $gte: from,
      $lte: to
    }
  });
  return users;
};



const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);
module.exports = model;