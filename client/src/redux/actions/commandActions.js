import React from "react";
import DefaultBlock from "../../elementBlocks/DefaultBlock";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const deleteCommand = (id, commandsList, commandsJSON) => (dispatch) => {
  for (let a = 0; a < commandsList.length; a++) {
    if (commandsList[a].props.id === id) {
      commandsList.splice(a, 1);
      commandsJSON.splice(a, 1);
      dispatch({ type: "UPDATE_COMMAND_LIST", payload: commandsList });
      dispatch({ type: "UPDATE_COMMAND_JSON", payload: commandsJSON });
    }
  }
};

export const executeCommands = (commandsJSON) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/commands/do", { data: commandsJSON })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateCommand = (id, commandsList, commandsJSON, name, value) => (dispatch) => {
  console.log(value);
  for (let a = 0; a < commandsList.length; a++) {
    if (commandsList[a].props.id === id) {
      for (let b = 0; b < commandsList[a].props.fields.length; b++) {
        if (commandsList[a].props.fields[b].slug === name) {
          commandsList[a].props.fields[b].value = value;
          console.log(commandsJSON[a][name]);
          commandsJSON[a][name] = value;
        }
      }
      dispatch({ type: "UPDATE_COMMAND_LIST", payload: commandsList });
      dispatch({ type: "UPDATE_COMMAND_JSON", payload: commandsJSON });
    }
  }
};

export const addCommand = (type) => (dispatch) => {
  let uniqueID = uuidv4();
  switch (type) {
    case "LOAD_URL":
      dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "LOAD_URL", url: "", id: uniqueID } });
      dispatch({ type: "ADD_COMMAND_LIST", payload: <DefaultBlock name="Load URL" fields={[{ label: "Address", inputType: "text", slug: "url", value: "" }]} id={uniqueID} /> });
      break;
    case "CLICK":
      dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "CLICK", selector: "", id: uniqueID } });
      dispatch({ type: "ADD_COMMAND_LIST", payload: <DefaultBlock name="Click" fields={[{ label: "Selector", inputType: "text", slug: "selector", value: "" }]} id={uniqueID} /> });
      break;
    case "SCREENSHOT":
      dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "SCREENSHOT", file_name: "", id: uniqueID } });
      dispatch({ type: "ADD_COMMAND_LIST", payload: <DefaultBlock name="Screenshot" fields={[{ label: "File Name", inputType: "text", slug: "file_name", value: "" }]} id={uniqueID} /> });
      break;
    case "SET_TIMEOUT":
      dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "SET_TIMEOUT", duration: "", id: uniqueID } });
      dispatch({ type: "ADD_COMMAND_LIST", payload: <DefaultBlock name="Set Timeout" fields={[{ label: "Duration (ms)", inputType: "text", slug: "duration", value: "" }]} id={uniqueID} /> });
      break;
    case "SUBMIT_FORM":
      dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "SUBMIT_FORM", selector: "", id: uniqueID } });
      dispatch({ type: "ADD_COMMAND_LIST", payload: <DefaultBlock name="Submit Form" fields={[{ label: "Selector", inputType: "text", slug: "selector", value: "" }]} id={uniqueID} /> });
      break;
    case "TYPE":
      dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "TYPE", selector: "", text: "", id: uniqueID } });
      dispatch({
        type: "ADD_COMMAND_LIST",
        payload: (
          <DefaultBlock
            name="Type"
            fields={[
              { label: "Selector", inputType: "text", slug: "selector", value: "" },
              { label: "Text", inputType: "text", slug: "text", value: "" },
            ]}
            key={uniqueID}
            id={uniqueID}
          />
        ),
      });
      break;
    default:
      break;
  }
};
