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
  axios.post("http://localhost:5000/api/commands/do", { data: commandsJSON }).catch((err) => {
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
  for (let a = 0; a < commands.length; a++) {
    let uniqueID = uuidv4();
    switch (commands[a].type) {
      case "LOAD_URL":
        load_url(commands[a], uniqueID, dispatch);
        break;
      case "CLICK":
        click(commands[a], uniqueID, dispatch);
        break;
      case "SCREENSHOT":
        screenshot(commands[a], uniqueID, dispatch);
        break;
      case "SET_TIMEOUT":
        set_timeout(commands[a], uniqueID, dispatch);
        break;
      case "SUBMIT_FORM":
        submit_form(commands[a], uniqueID, dispatch);
        break;
      case "TYPE":
        type(commands[a], uniqueID, dispatch);
        break;
      default:
        break;
    }
  }
};
const type = (command, uuid, dispatch) => {
  let element = (
    <DefaultBlock
      name="Type"
      fields={[
        { label: "Selector", inputType: "text", slug: "selector", value: command.selector },
        { label: "Text", inputType: "text", slug: "text", value: command.text },
      ]}
      id={uuid}
    />
  );
  if (dispatch) {
    dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "TYPE", selector: command.selector, text: command.text, id: uuid } });
    dispatch({ type: "ADD_COMMAND_LIST", payload: element });
  } else {
    return element;
  }
};

const load_url = (command, uuid, dispatch = false) => {
  let element = (
    <DefaultBlock
      name="Load URL"
      fields={[
        {
          label: "Address",
          inputType: "text",
          slug: "url",
          value: command.url,
        },
      ]}
      id={uuid}
    />
  );
  if (dispatch) {
    dispatch({ type: "ADD_COMMAND_JSON", payload: { type: command.type, url: command.url, id: uuid } });
    dispatch({ type: "ADD_COMMAND_LIST", payload: element });
  } else {
    return element;
  }
};

const click = (command, uuid, dispatch) => {
  let element = (
    <DefaultBlock
      name="Click"
      fields={[
        {
          label: "Selector",
          inputType: "text",
          slug: "selector",
          value: command.selector,
        },
      ]}
      id={uuid}
    />
  );
  if (dispatch) {
    dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "CLICK", selector: command.selector, id: uuid } });
    dispatch({ type: "ADD_COMMAND_LIST", payload: element });
  } else {
    return element;
  }
};

const screenshot = (command, uuid, dispatch) => {
  let element = (
    <DefaultBlock
      name="Screenshot"
      fields={[
        {
          label: "File Name",
          inputType: "text",
          slug: "name",
          value: command.name,
        },
      ]}
      id={uuid}
    />
  );
  if (dispatch) {
    dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "SCREENSHOT", name: command.name, id: uuid } });
    dispatch({ type: "ADD_COMMAND_LIST", payload: element });
  } else {
    return element;
  }
};

const set_timeout = (command, uuid, dispatch) => {
  let element = (
    <DefaultBlock
      name="Set Timeout"
      fields={[
        {
          label: "Duration (ms)",
          inputType: "text",
          slug: "duration",
          value: command.duration,
        },
      ]}
      id={uuid}
    />
  );
  if (dispatch) {
    dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "SET_TIMEOUT", duration: command.duration, id: uuid } });
    dispatch({ type: "ADD_COMMAND_LIST", payload: element });
  } else {
    return element;
  }
};

const submit_form = (command, uuid, dispatch) => {
  let element = (
    <DefaultBlock
      name="Submit Form"
      fields={[
        {
          label: "Selector",
          inputType: "text",
          slug: "selector",
          value: command.selector,
        },
      ]}
      id={uuid}
    />
  );
  if (dispatch) {
    dispatch({ type: "ADD_COMMAND_JSON", payload: { type: "SUBMIT_FORM", selector: command.selector, id: uuid } });
    dispatch({ type: "ADD_COMMAND_LIST", payload: element });
  } else {
    return element;
  }
};
