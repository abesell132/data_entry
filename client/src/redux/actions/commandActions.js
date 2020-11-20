import store from "../store";
import getElementConfig from "../../CommandBlocks/ElementConfig";
import { saveScript } from "./scriptActions";
import setValue from "../../utils/setValue";

// @desc      Adds new key value pair to command determined by context
// @params    context {String} - Mix of dot and bracket notation used to ease command updates
//            slug {String} - Could be referred to as the key part of the key/value pair
//            value {Array} - Value of said key/value pair
export const updateCommand = (context, slug, value) => (dispatch) => {
  let state = store.getState();
  let newState = state.script;
  setValue("json" + context + "." + slug, value, newState);
  dispatch(saveScript({ commands: newState.json }));
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState.json });
};

// @desc      Sets command list
// @params    commands {Array} - List of commands to set to store
export const setCommands = (commands) => (dispatch) => {
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: commands });
};

// @desc      Adds new Command to end of context array, state value is set to new array at position determined by context
// @params    context {String} - Mix of dot and bracket notation used to ease command updates
//            commands {Array} - Command list to append
//            contextCommands {Array} - List of commands to append new command to
export const addCommands = (context, commands, contextCommands) => (
  dispatch
) => {
  const state = store.getState();
  let newState = state.script;
  for (let a = 0; a < commands.length; a++) {
    let payload = getElementConfig(commands[a]).addCommandPayload;
    contextCommands.push(payload);
  }
  setValue("json" + context, contextCommands, newState);
  dispatch(saveScript({ commands: newState.json }));
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState.json });
};

// @desc      Updates command list at context depth
// @params    context {String} - Mix of dot and bracket notation used to ease command updates
//            commands {Array} - command list to replace current command list at context depth
export const updateCommandList = (context, commands) => (dispatch) => {
  const state = store.getState();
  let newState = state.script;
  setValue("json" + context, commands, newState);
  dispatch(saveScript({ commands: newState.json }));
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: newState.json });
};
