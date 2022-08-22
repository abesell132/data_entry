import axios from "axios";
import { setCommands } from "./commandActions";
import store from "../store";
import isEmpty from "../../validation/is-empty";

// @desc      Send new script request, from response, add new script to store
// @params    name {String} - Default Script Name
export const addScript = (name) => (dispatch) => {
  const state = store.getState();
  let newScript = state.auth.accountScripts;
  axios
    .post("/api/scripts/addScript", { name })
    .then((res) => {
      newScript.push(res.data);
      dispatch({ type: "UPDATE_SCRIPT_LIST", payload: newScript });
    })
    .catch((err) => {
      if (err) throw err;
    });
};

// @desc    Sends script to Server for saving/updating
// @params    script {Object} - Script object to save/update
//            id - Script Id to save/update
export const saveScript =
  (script = {}, id) =>
  (dispatch) => {
    if (isEmpty(id)) {
      let state = store.getState();
      id = state.script.currentScript;
    }
    axios.post("/api/scripts/updateScript", { script, id }).catch((err) => {
      if (err) throw err;
    });
  };

// @desc      Updates script name in store, saves script to server
// @params    name {String} - New Script Name
//            id - Script Id to update
export const renameScript = (name, id) => (dispatch) => {
  dispatch({ type: "UPDATE_SCRIPT_NAME", payload: name });
  dispatch(saveScript({ name }, id));
};

// @desc      Resets generated variables in store, send req to server to execute, upon response, add generated variables, and remove close popup
// @params    id - Script Id to execute
export const executeScript = (id) => (dispatch) => {
  dispatch({ type: "CLEAR_GENERATED_VARIABLES" });
  axios
    .post("/api/scripts/executeScript", { id })
    .then((res) => {
      dispatch({
        type: "SET_GENERATED_VARIABLES",
        payload: res.data.variables,
      });
      dispatch({ type: "SET_POPUP_TYPE", payload: "" });
    })
    .catch((err) => {
      if (err) throw err;
    });
};

// @desc      Query server for account scripts, update script list with response data
export const queryScripts = () => (dispatch) => {
  axios.post("/api/scripts/getAccountScripts").then((res) => {
    dispatch({ type: "UPDATE_SCRIPT_LIST", payload: res.data });
  });
};

// @desc      Get single script data from server; update script id, name, variables, and commands in store
// @params    id - ID of the script to fetch
export const getScript = (id) => (dispatch) => {
  axios.post("/api/scripts/getScript", { id }).then((res) => {
    dispatch({ type: "UPDATE_CURRENT_SCRIPT", payload: id });
    dispatch({ type: "UPDATE_SCRIPT_NAME", payload: res.data.name });
    dispatch({ type: "SET_VARIABLES", payload: res.data.variables });
    dispatch(setCommands(res.data.commands));
  });
};

// @desc      Delete script request to server, on successful deletion, remove index of script from store
// @params    id - Script Id to delete
//            index {Integer} - Index position of the script staged for deletion in the Account Script List
export const deleteScript = (id, index) => (dispatch) => {
  const state = store.getState();
  let newScript = state.auth.accountScripts;
  axios
    .post("/api/scripts/deleteScript", { id })
    .then(() => {
      newScript.splice(index, 1);
      dispatch({ type: "UPDATE_SCRIPT_LIST", payload: newScript });
    })
    .catch((err) => {
      if (err) throw err;
    });
};

// @desc      Clears all data pertaining to current script in store
export const clearCurrentScript = () => (dispatch) => {
  dispatch({ type: "UPDATE_CURRENT_SCRIPT", payload: "" });
  dispatch({ type: "UPDATE_SCRIPT_NAME", payload: "" });
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: [] });
  dispatch({ type: "SET_VARIABLES", payload: [] });
};

// @desc      Sends variable to server for deletion, server sends back new variable list which replaces current variable list in store
// @params    variable {Object} - Variable object to delete
//                @required    ID;
export const deleteVariable = (variable) => (dispatch) => {
  const state = store.getState();
  axios
    .post(`/api/scripts/deleteVariable`, {
      variable,
      scriptID: state.script.currentScript,
    })
    .then((res) => {
      dispatch({ type: "SET_VARIABLES", payload: res.data });
    })
    .catch((err) => {
      if (err) throw err;
    });
};

// @desc      Add variable to script, set new variable list on response
// @params    variable {Object} - Variable object to Add
export const createNewVariable = (variable) => (dispatch) => {
  const state = store.getState();
  axios
    .post(`/api/scripts/createVariable`, {
      variable,
      scriptID: state.script.currentScript,
    })
    .then((res) => {
      dispatch({ type: "SET_VARIABLES", payload: res.data });
    })
    .catch((err) => {
      if (err) throw err;
    });
};

// @desc      Updates variable on server, set new variable list on response
// @params    variable {Object} - Variable object to Add
export const updateVariable = (variable) => (dispatch) => {
  const state = store.getState();
  axios
    .post("/api/scripts/updateVariable", {
      variable,
      scriptID: state.script.currentScript,
    })
    .then((res) => {
      dispatch({ type: "SET_VARIABLES", payload: res.data });
    })
    .catch((err) => {
      if (err) throw err;
    });
};

// @desc      uploads variable file to server, set new variable list on response
// @params    file {Object?} - Variable object of image
// @see       npm Dropzone package for more information
export const uploadVariable = (file) => (dispatch) => {
  const state = store.getState();
  let config = { headers: { "Content-Type": "multipart/form-data" } };
  let fd = new FormData();
  fd.append("file", file);
  axios
    .post("/api/scripts/variable/" + state.script.currentScript + "/imageUpload", fd, config)
    .then((res) => {
      dispatch({ type: "SET_VARIABLES", payload: res.data });
    })
    .catch((err) => {
      if (err) throw err;
    });
};
