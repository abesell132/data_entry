let getValue = (propertyPath, value, obj) => {
  console.log(obj);
  // this is a super simple parsing, you will want to make this more complex to handle correctly any path
  // it will split by the dots at first and then simply pass along the array (on next iterations)
  let properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split(".");
  if (properties.length > 2) {
    if (!obj.hasOwnProperty(properties[0]) || typeof obj[properties[0]] !== "object") obj[properties[0]] = {};
    return getValue(properties.slice(1), value, obj[properties[0]]);
  } else {
    console.log(obj);
    // console.log(obj[properties[0]][properties[1]]);
  }
};

export default getValue;
