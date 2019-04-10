const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmail(data.title)) {
    errors.title = "Experience title is required";
  }
  if (Validator.isEmail(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
