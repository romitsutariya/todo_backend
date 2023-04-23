const { Schema, model } = require("mongoose");

<<<<<<< HEAD
const userSchema = new mongoose.Schema({
  firstname: { type: String, default: null },
  lastname: { type: String, default: null },
=======
const userSchema = new Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
>>>>>>> 4afe0e20799243561224af0b0c9990f0d6f85127
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = model("user", userSchema);
