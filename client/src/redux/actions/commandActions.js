import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import store from "../store";
import { saveScript } from "./scriptActions";

export const deleteCommand = (index) => (dispatch) => {
  let state = store.getState();
  let newState = state.script.json;
  newState.splice(index, 1);
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState });
};

export const executeCommands = (commandsJSON) => (dispatch) => {
  axios.post("http://localhost:5000/api/commands/do", { data: commandsJSON }).catch((err) => {
    if (err) throw err;
  });
};
export const reorderCommands = (newJSON) => (dispatch) => {
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: newJSON });
  dispatch(saveScript({ commands: newJSON }));
};

export const updateCommand = (id, slug, value) => (dispatch) => {
  let state = store.getState();
  let newState = state.script.json;
  for (let a = 0; a < newState.length; a++) {
    if (newState[a].id === id) {
      let command = newState[a];
      command[slug] = value;
      dispatch(saveScript({ commands: newState }));
      dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState });
    }
  }
};

export const addCommands = (commands) => (dispatch) => {
  for (let a = 0; a < commands.length; a++) {
    let uuid = commands[a].id ? commands[a].id : uuidv4();

    switch (commands[a].type) {
      case "LOAD_URL":
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: commands[a].type, url: commands[a].url, id: uuid } });
        break;
      case "CLICK":
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: commands[a].type, selector: commands[a].selector, id: uuid } });
        break;
      case "SCREENSHOT":
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: commands[a].type, name: commands[a].name, id: uuid } });
        break;
      case "SET_TIMEOUT":
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: commands[a].type, duration: commands[a].duration, id: uuid } });
        break;
      case "SUBMIT_FORM":
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: commands[a].type, selector: commands[a].selector, id: uuid } });
        break;
      case "TYPE":
        dispatch({ type: "ADD_COMMAND_JSON", payload: { type: commands[a].type, selector: commands[a].selector, text: commands[a].text, id: uuid } });
        break;
      default:
        break;
    }
  }
};
