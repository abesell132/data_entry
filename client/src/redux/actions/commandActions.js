import store from "../store";
import getElementConfig from "../../CommandBlocks/ElementConfig";
import { saveScript } from "./scriptActions";
import setValue from "../../utils/setValue";
import getValue from "../../utils/getValue";

export const deleteCommand = (index) => (dispatch) => {
  let state = store.getState();
  let newState = state.script.json;
  newState.splice(index, 1);
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState });
};

export const reorderCommands = (context, order) => (dispatch) => {
  const state = store.getState();
  let newState = state.script;
  setValue("json" + context, order, newState);
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState.json });
  dispatch(saveScript({ commands: newState.json }));
};

export const updateCommand = (context, slug, value) => (dispatch) => {
  let state = store.getState();
  let newState = state.script;
  setValue("json" + context + "." + slug, value, newState);
  dispatch(saveScript({ commands: newState.json }));
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState.json });
};

// export const updateCommand = (id, slug, value) => (dispatch) => {
//   let state = store.getState();
//   let newState = state.script.json;

//   for (let a = 0; a < newState.length; a++) {
//     if (newState[a].id === id) {
//       newState[a][slug] = value;
//       dispatch(saveScript({ commands: newState }));
//       dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState });
//     }
//   }
// };

export const setCommands = (commands) => (dispatch) => {
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: commands });
};
export const addCommands = (context, commands, contextCommands) => (dispatch) => {
  const state = store.getState();
  let newState = state.script;
  console.log(contextCommands);
  for (let a = 0; a < commands.length; a++) {
    let payload = getElementConfig(commands[a]).addCommandPayload;
    contextCommands.push(payload);
  }

  setValue("json" + context, contextCommands, newState);
  dispatch(saveScript({ commands: newState.json }));
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState.json });
};

export const deleteMe = (context, index, contextCommands) => (dispatch) => {
  const state = store.getState();
  let newState = state.script;
  contextCommands.slice(index, 0);
  setValue("json" + context, contextCommands, newState);
};
