import axios from "axios";
import { addCommands } from "./commandActions";
import store from "../store";

export const saveScript = (script = {}, id) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/scripts/updateScript", { script, id })
    .then((res) => {
      if (script.name) {
        // dispatch(queryScripts());
      }
    })
    .catch((err) => console.log(err));
};

export const renameScript = (name, id) => (dispatch) => {
  dispatch({ type: "UPDATE_SCRIPT_NAME", payload: name });
  dispatch(saveScript({ name }, id));
};

export const executeScript = (id) => (dispatch) => {
  const state = store.getState();
  let newState = state.script.variables;
  axios
    .post("http://localhost:5000/api/scripts/executeScript", { id })
    .then((res) => {
      for (let a = 0; a < res.data.variables.length; a++) {
        newState.push(res.data.variables[a]);
      }
      dispatch({ type: "ADD_VARIABLES", payload: newState });
      dispatch(saveScript({ variables: newState }, id));
    })
    .catch((err) => console.log(err));
};

export const addScript = (name) => (dispatch) => {
  const state = store.getState();
  let newScript = state.auth.accountScripts;
  axios
    .post("http://localhost:5000/api/scripts/addScript", {
      name,
    })
    .then((res) => {
      newScript.push(res.data);
      dispatch({ type: "UPDATE_SCRIPT_LIST", payload: newScript });
    })
    .catch((err) => console.log(err));
};

export const queryScripts = () => (dispatch) => {
  axios.post("http://localhost:5000/api/scripts/getAccountScripts").then((res) => {
    dispatch({ type: "UPDATE_SCRIPT_LIST", payload: res.data });
  });
};

export const findOneScript = (id) => (dispatch) => {
  axios.post("http://localhost:5000/api/scripts/getScript", { id }).then((res) => {
    dispatch(addCommands(res.data.commands));
    dispatch({ type: "ADD_VARIABLES", payload: res.data.variables });
    dispatch({ type: "UPDATE_CURRENT_SCRIPT", payload: id });
    dispatch({ type: "UPDATE_SCRIPT_NAME", payload: res.data.name });
  });
};

export const deleteScript = (id, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/scripts/deleteScript", { id })
    .then((res) => {
      history.push("/");
      dispatch(queryScripts());
    })
    .catch((err) => console.log(err));
};

export const clearCurrentScript = () => (dispatch) => {
  dispatch({ type: "UPDATE_CURRENT_SCRIPT", payload: "" });
  dispatch({ type: "UPDATE_COMMAND_LIST", payload: [] });
  dispatch({ type: "UPDATE_COMMAND_JSON", payload: [] });
};

export const deleteVariable = (name, generated = 0, index) => (dispatch) => {
  const state = store.getState();
  axios
    .post(`http://localhost:5000/api/scripts/variableDelete/${state.script.currentScript}/${name}`, { generated })
    .then(() => {
      let newVariables = state.script.variables;
      newVariables.splice(index, 1);
      dispatch({ type: "ADD_VARIABLES", payload: newVariables });
      dispatch(saveScript({ variables: newVariables }, state.script.currentScript));
    })
    .catch((err) => console.log(err));
};
export const uploadVariable = (file) => (dispatch) => {
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  let fd = new FormData();
  fd.append("file", file);

  const state = store.getState();
  let newVariables = state.script.variables;

  axios
    .post("http://localhost:5000/api/scripts/variable/" + state.script.currentScript + "/" + file.name, fd, config)
    .then((response) => {
      newVariables.push({ type: "uploaded", name: file.name });
      dispatch({ type: "ADD_VARIABLES", payload: newVariables });
    })
    .catch((err) => console.log(err));
};

Array.prototype.removeAll = function (key) {
  var index = this.indexOf(key);

  if (index === -1) return;

  this.splice(index, 1);
  this.removeAll(key);
};
