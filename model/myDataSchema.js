const mongoose = require('mongoose');
const { Agent } = require('node:http');
const Schema = mongoose.Schema;
// define the Schema (the structure of the article)
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  number: String,
  age: Number,
  country: String,
  gender: String,
  password: String},
{ timestamps: true }
)
userSchema.index({ firstName: 1 });
userSchema.index({ lastName: 1 });

// Create a model based on that schema
const User = mongoose.model("User", userSchema)

// export the model
module.exports = User