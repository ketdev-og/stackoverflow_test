const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const { default: isMobilePhone } = require("validator/lib/isMobilePhone");
const { default: isEmail } = require("validator/lib/isEmail");

const TaskSchema = new Schema({
  project_id: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  descriptions: {
    type: String,
  },
  dates: {
    issueDate: {
      type: String,
    },
    completeionDate: {
      type: String,
    },
  },
  status:{
    type:String,
    default:"pending"
  },
  assigned_to:{
    type:String
  }
});

module.exports = mongoose.model('Task', TaskSchema);