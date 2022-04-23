const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;


const ProjectSchema = new Schema({
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
  isCompleted:{
      type:Boolean,
      default:false
  },
  lead_id:{
    type:String,
}
});

module.exports = mongoose.model('Project', ProjectSchema);