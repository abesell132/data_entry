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
  for (let a = 0; a < commandsList.length; a++) {
    if (commandsList[a].props.id === id) {
      for (let b = 0; b < commandsList[a].props.fields.length; b++) {
        if (commandsList[a].props.fields[b].slug === name) {
          commandsList[a].props.fields[b].value = value;
          commandsJSON[a][name] = value;
        }
      }
      dispatch({ type: "UPDATE_COMMAND_LIST", payload: commandsList });
      dispatch({ type: "UPDATE_COMMAND_JSON", payload: commandsJSON });
    }
  }
};

export const addCommands = (commands, ret = false) => (dispatch) => {
  console.log(commands);
  for (let a = 0; a < commands.length; a++) {
    let uniqueID = uuidv4();
    console.log(commands[a]);
    switch (commands[a].type) {
      case "LOAD_URL":
        if (ret) {
          return <DefaultBlock name="Load URL" fields={[{ label: "Address", inputType: "text", slug: "url", value: commands[a].url }]} id={uniqueID} />;
        }
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: commands[a].type, url: commands[a].url, id: uniqueID } });
        dispatch({ type: "ADD_COMMAND_LIST", payload: <DefaultBlock name="Load URL" fields={[{ label: "Address", inputType: "text", slug: "url", value: commands[a].url }]} id={uniqueID} /> });
        break;
      case "CLICK":
        if (ret) {
          return <DefaultBlock name="Click" fields={[{ label: "Selector", inputType: "text", slug: "selector", value: commands[a].selector }]} id={uniqueID} />;
        }
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "CLICK", selector: commands[a].selector, id: uniqueID } });
        dispatch({ type: "ADD_COMMAND_LIST", payload: <DefaultBlock name="Click" fields={[{ label: "Selector", inputType: "text", slug: "selector", value: commands[a].selector }]} id={uniqueID} /> });
        break;
      case "SCREENSHOT":
        if (ret) {
          return <DefaultBlock name="Screenshot" fields={[{ label: "File Name", inputType: "text", slug: "file_name", value: commands[a].file_name }]} id={uniqueID} />;
        }
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "SCREENSHOT", file_name: commands[a].file_name, id: uniqueID } });
        dispatch({
          type: "ADD_COMMAND_LIST",
          payload: <DefaultBlock name="Screenshot" fields={[{ label: "File Name", inputType: "text", slug: "file_name", value: commands[a].file_name }]} id={uniqueID} />,
        });
        break;
      case "SET_TIMEOUT":
        if (ret) {
          return <DefaultBlock name="Set Timeout" fields={[{ label: "Duration (ms)", inputType: "text", slug: "duration", value: commands[a].duration }]} id={uniqueID} />;
        }
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "SET_TIMEOUT", duration: commands[a].duration, id: uniqueID } });
        dispatch({
          type: "ADD_COMMAND_LIST",
          payload: <DefaultBlock name="Set Timeout" fields={[{ label: "Duration (ms)", inputType: "text", slug: "duration", value: commands[a].duration }]} id={uniqueID} />,
        });
        break;
      case "SUBMIT_FORM":
        if (ret) {
          return <DefaultBlock name="Submit Form" fields={[{ label: "Selector", inputType: "text", slug: "selector", value: commands[a].selector }]} id={uniqueID} />;
        }
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "SUBMIT_FORM", selector: commands[a].selector, id: uniqueID } });
        dispatch({
          type: "ADD_COMMAND_LIST",
          payload: <DefaultBlock name="Submit Form" fields={[{ label: "Selector", inputType: "text", slug: "selector", value: commands[a].selector }]} id={uniqueID} />,
        });
        break;
      case "TYPE":
        if (ret) {
          return (
            <DefaultBlock
              name="Type"
              fields={[
                { label: "Selector", inputType: "text", slug: "selector", value: commands[a].selector },
                { label: "Text", inputType: "text", slug: "text", value: commands[a].text },
              ]}
              key={uniqueID}
              id={uniqueID}
            />
          );
        }
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "TYPE", selector: commands[a].selector, text: commands[a].text, id: uniqueID } });
        dispatch({
          type: "ADD_COMMAND_LIST",
          payload: (
            <DefaultBlock
              name="Type"
              fields={[
                { label: "Selector", inputType: "text", slug: "selector", value: commands[a].selector },
                { label: "Text", inputType: "text", slug: "text", value: commands[a].text },
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
  }
};
