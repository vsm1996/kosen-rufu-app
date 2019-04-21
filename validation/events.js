const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateEventInput(data) {
  let errors = {};

  data.location = !isEmpty(data.location) ? data.location : "";
  data.eventDate = !isEmpty(data.eventDate) ? data.eventDate : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 3, max: 300 })) {
    errors.text = "Post must be between 3 and 300 characters";
  }
  if (Validator.isEmpty(data.location)) {
    errors.text = "Location field is invalid";
  }
  if (Validator.isEmpty(data.eventDate)) {
    errors.text = "Date field is invalid";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is invalid";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
