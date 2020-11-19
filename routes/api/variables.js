const parseVariables = (command) => {
  let variableObject;
  switch (command.type) {
    case "SCREENSHOT":
      variableObject = extractVariables(command.name);
      let name = parseVariable(variableObject, command);
      command.name = name;
      return command;
    case "LOAD_URL":
      variableObject = extractVariables(command.url);
      let url = parseVariable(variableObject, command);
      command.url = url;
      return command;
  }
};

exports.parseVariables = parseVariables;

let parseVariable = (varObj, command) => {
  for (let a = 0; a < varObj.variables.length; a++) {
    switch (varObj.variables[a][0]) {
      case "Array Value":
        varObj.value = [
          varObj.value.slice(0, varObj.variables[a][1]),
          command.arrVal,
          varObj.value.slice(varObj.variables[a][1]),
        ].join("");
        break;
      case "Array Index":
        varObj.value = [
          varObj.value.slice(0, varObj.variables[a][1]),
          command.arrIndex + 1,
          varObj.value.slice(varObj.variables[a][1]),
        ].join("");
        break;
    }
  }
  return varObj.value;
};

let extractVariables = (value) => {
  let start = /{/gi;

  let end = /}/gi;
  let varIndices = [];
  let retVal = {
    value,
    variables: [],
  };
  let result;
  let endIndex = 0;
  while ((result = start.exec(value))) {
    varIndices.push([result.index]);
  }
  while ((result = end.exec(value))) {
    varIndices[endIndex].push(result.index);
    endIndex++;
  }
  for (let a = 0; a < varIndices.length; a++) {
    retVal.variables.push([
      value.slice(varIndices[a][0] + 1, varIndices[a][1]),
      varIndices[a][0],
    ]);
  }

  for (let a = varIndices.length - 1; a >= 0; a--) {
    retVal.value = retVal.value.replace(
      retVal.value.substring(varIndices[a][0], varIndices[a][1] + 1),
      ""
    );
    var res = retVal.value.split("");
    res.splice(varIndices[a][0], varIndices[a][0] - varIndices[a][1] + 1);
    let value = res.join("");
    retVal.value = value;
  }
  return retVal;
};
