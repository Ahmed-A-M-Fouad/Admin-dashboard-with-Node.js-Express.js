const User = require("../model/myDataSchema");
const bcrypt = require("bcrypt");

const registerUser = async (userData) => {
  const { password } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    ...userData,
    password: hashedPassword,
  });
};

module.exports = { registerUser };