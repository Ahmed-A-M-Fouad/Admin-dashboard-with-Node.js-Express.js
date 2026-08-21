const User = require("../model/myDataSchema");
const bcrypt = require("bcrypt");

const registerUser = async (userData) => {
  const { email, password } = userData;
  
  if(await User.findOne({email})){
    const error = new Error("Email is already registered");
      error.errorCode = "EMAIL_EXISTS"
      throw error}

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    ...userData,
    password: hashedPassword,
  });
};


module.exports = { registerUser };