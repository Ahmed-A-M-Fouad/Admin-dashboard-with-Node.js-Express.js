const { body, validationResult } = require("express-validator");
const country_list = require("../data/data");

const registerRules = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("user/register", {
        country_list,
        errors: [errors.array()[0].msg],
      });
    }
    next();
  },
];

module.exports = registerRules;