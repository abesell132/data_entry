let setValue = (propertyPath, value, obj) => {
  // this is a super simple parsing, you will want to make this more complex to handle correctly any path
  // it will split by the dots at first and then simply pass along the array (on next iterations)
  let properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split(".");

  if (properties.length > 1) {
    if (!obj.hasOwnProperty(properties[0]) || typeof obj[properties[0]] !== "object") obj[properties[0]] = {};
    return setValue(properties.slice(1), value, obj[properties[0]]);
  } else {
    obj[properties[0]] = value;
    return true; // this is the end
  }
};

export default setValue;
