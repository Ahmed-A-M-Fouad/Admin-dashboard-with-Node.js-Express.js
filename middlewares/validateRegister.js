
const country_list = require("../data/data");

const renderError = (res, message) =>
  res.status(400).render("user/register", { country_list, errors: [message] });

const validateFields = (req, res, next) => {


  const firstName = req.body.firstName?.trim() || "";
  const lastName = req.body.lastName?.trim() || "";
  const email = req.body.email?.trim().toLowerCase() || "";
  const password = req.body.password || "";
  const confirmPassword = req.body.confirmPassword || "";
  const number = req.body.number?.trim() || "";
  const age = req.body.age;
  const country = req.body.country;



  if (!firstName || !lastName || !email || !password || !confirmPassword || !age || !country || !number) {
    return renderError(res, "All fields are required");
    //return res.status(400).json({ message: "All fields are required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return renderError(res, "Invalid email structure");

    //return res.status(400).json({ message: "invalid email structure" });
  }

  if (password !== confirmPassword) {
    return renderError(res, "Passwords must match each other");

    //return res.status(400).json({ message: "Passwords must match each other" });
  }
  if (firstName.length < 2 || lastName.length < 2) {
    return renderError(res, "Names must be more than 2 characters");

    //return res.status(400).json({ message: "Names must be more than 2 characters" });
  }
  if (password.length < 8) {
    return renderError(res, "Password must be at least 8 characters");
    //return res.status(400).json({ message: "Password must be at least 8 characters" });
  }
  if (isNaN(age) || age < 18) {
    return renderError(res, "Age must be > 18");

  }
  if (number.includes(" ") || isNaN(number)) {
    return renderError(res, "Number must contain only numbers");

  }
  if (!country_list.includes(country)) {
    return renderError(res, "Country selected isn't in the country list")
  }
  req.body.firstName = firstName;
  req.body.lastName = lastName;
  req.body.email = email;
  req.body.number = number;
  next()

}


module.exports = { validateFields };