import axios from "axios";
import { addCommands } from "./commandActions";

export const addScript = (name) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/scripts/add", {
      name,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export const queryScripts = () => (dispatch) => {
  axios.post("http://localhost:5000/api/scripts/queryScripts").then((res) => {
    console.log(res.data);
    dispatch({ type: "UPDATE_SCRIPT_LIST", payload: res.data });
  });
};

export const findOneScript = (id, history) => (dispatch) => {
  axios.post("http://localhost:5000/api/scripts/findOne", { id }).then((res) => {
    console.log(res.data.commands);
    history.push("/app/" + id);
    dispatch(addCommands(res.data.commands));
    dispatch({ type: "UPDATE_CURRENT_SCRIPT", payload: id });
  });
};

export const saveScript = (commands, id) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/scripts/updateCommands", { commands, id })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
