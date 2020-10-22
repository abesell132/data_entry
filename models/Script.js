const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ScriptSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  commands: [],
});

module.exports = Script = mongoose.model("scripts", ScriptSchema);
