const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateDefaultBlockFields(fields, state) {
  let errors = {};
  let values = {};
  for (let a = 0; a < fields.length; a++) {
    let value;
    switch (fields[a].slug) {
      case "url":
        value = isEmpty(state.url) ? fields[a].value : state.url;
        // if (Validator.isEmpty(value)) {
        //   errors.url = "Address cannot be blank";
        //   break;
        // } else if (!Validator.isURL(value)) {
        //   errors.url = "Address is not a valid url.";
        //   break;
        // }
        values.url = value;
        break;
      case "name":
        value = isEmpty(state.name) ? fields[a].value : state.name;
        // if (Validator.isEmpty(value)) {
        //   errors.name = "File path cannot be blank";
        //   break;
        // } else if (!Validator.contains(value, ".jpg") && !Validator.contains(value, ".png")) {
        //   errors.name = "File path is not .jpg or .png";
        //   break;
        // }
        values.name = value;
        break;
      case "selector":
        value = isEmpty(state.selector) ? fields[a].value : state.selector;
        // if (Validator.isEmpty(value)) {
        //   errors.selector = "Selector cannot be blank";
        //   break;
        // }
        values.selector = value;
        break;
      case "text":
        value = isEmpty(state.text) ? fields[a].value : state.text;
        // if (Validator.isEmpty(value)) {
        //   errors.text = "Text cannot be blank";
        //   break;
        // }
        values.text = value;
        break;
      case "duration":
        value = isEmpty(state.duration) ? fields[a].value : state.duration;
        // if (Validator.isEmpty(value)) {
        //   errors.duration = "Duration cannot be blank";
        //   break;
        // } else if (!Validator.isNumeric(value)) {
        //   errors.duration = "Duration must be a whole number";
        // }
        values.duration = value;
        break;
      default:
        break;
    }
  }

  return new Promise((resolve, reject) => {
    if (isEmpty(errors)) {
      resolve(values);
    } else {
      reject(errors);
    }
  });
};
