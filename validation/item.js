const { check, body } = require("express-validator");
const { Activity } = require("../models");

const itemSchema = [
  check("title").trim().escape().notEmpty().withMessage("title is required"),

  check("activity_group_id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("activity_group_id is required")
    .isInt()
    .withMessage("Must be a integer number")
    .bail()
    .custom((value) => {
      return Activity.findOne({ where: { id: value } }).then((data) => {
        if (!data) {
          return Promise.reject("invalid activity_group_id");
        }
      });
    }),

  check("priority")
    .if(body("priority").exists())
    .custom((value) => {
      const validPriority = ["very-high", "high", "normal", "low", "very-low"];
      console.log(validPriority.includes(value));
      if (value && !validPriority.includes(value)) {
        return Promise.reject(
          "invalid priority value. valid value is very-high, high, normal, low, or very-low"
        );
      } else {
        return Promise.resolve();
      }
    }),
];

module.exports = itemSchema;
