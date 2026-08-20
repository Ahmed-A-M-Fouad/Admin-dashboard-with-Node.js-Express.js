const bcrypt = require("bcrypt");
const User = require("../model/myDataSchema.js");

//register password matching
const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// email matching
const emailExists = async (email) => {
  const user = await User.findOne({ email });
  return user; 
};

// password hash
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

//login password matching
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  passwordsMatch,
  emailExists,
  hashPassword,
  comparePassword,
};