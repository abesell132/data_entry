import axios from "axios";
import { addCommands } from "./commandActions";
import store from "../store";

export const executeScript = (id) => (dispatch) => {
  const state = store.getState();
  let newState = state.scripts.variables;
  axios
    .post("http://localhost:5000/api/scripts/execute", { id })
    .then((res) => {
      for (let a = 0; a < res.data.variables.length; a++) {
        console.log(res.data.variables[a]);
        newState.push(res.data.variables[a]);
      }

      dispatch({ type: "ADD_VARIABLES", payload: newState });
    })
    .catch((err) => console.log(err));
};

export const addScript = (name) => (dispatch) => {
  const state = store.getState();
  let newScript = state.auth.accountScripts;
  axios
    .post("http://localhost:5000/api/scripts/add", {
      name,
    })
    .then((res) => {
      newScript.push(res.data);
      dispatch({ type: "UPDATE_SCRIPT_LIST", payload: newScript });
    })
    .catch((err) => console.log(err));
};

export const queryScripts = () => (dispatch) => {
  axios.post("http://localhost:5000/api/scripts/queryScripts").then((res) => {
    console.log(res.data);
    dispatch({ type: "UPDATE_SCRIPT_LIST", payload: res.data });
  });
};

export const findOneScript = (id) => (dispatch) => {
  axios.post("http://localhost:5000/api/scripts/findOne", { id }).then((res) => {
    console.log(res.data);
    dispatch(addCommands(res.data.commands));
    dispatch({ type: "ADD_VARIABLES", payload: res.data.variables });
    dispatch({ type: "UPDATE_CURRENT_SCRIPT", payload: id });
    dispatch({ type: "UPDATE_SCRIPT_NAME", payload: res.data.name });
  });
};

export const saveScript = (script, id) => (dispatch) => {
  let newScript = {
    commands: script.json,
    variables: script.variables,
    name: script.name,
  };
  console.log(newScript);
  axios
    .post("http://localhost:5000/api/scripts/updateScript", { script: newScript, id })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const deleteScript = (id, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/scripts/delete", { id })
    .then((res) => {
      console.log(res);
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

export const uploadVariable = (file) => (dispatch) => {
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  let fd = new FormData();
  fd.append("name", "image");
  fd.append("file", file);

  const state = store.getState();
  let newVariables = state.scripts.variables;

  axios
    .post("http://localhost:5000/api/scripts/variable/" + state.scripts.currentScript + "/" + file.name, fd, config)
    .then((response) => {
      newVariables.push({ type: "uploaded", name: file.name });
      console.log(newVariables);
      dispatch({ type: "ADD_VARIABLES", payload: newVariables });
    })
    .catch((err) => console.log(err));
};
export const getVariableFile = (file_name, scriptID) => {};
