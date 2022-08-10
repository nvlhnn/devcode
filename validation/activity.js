const { check } = require("express-validator");

const activitySchema = [
  check("title").trim().escape().notEmpty().withMessage("title is required"),

  check("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .normalizeEmail()
    .withMessage("wrong email format"),
];

module.exports = activitySchema;
