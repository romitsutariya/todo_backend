const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  todos: { type: [{ item: String, done: {type:Boolean,default:false}}] }
});

module.exports = mongoose.model("todo", todoSchema);
