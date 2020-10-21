import { combineReducers } from "redux";
import authReducer from "./authReducer";
import appStateReducer from "./appStateReducer";
import commandReducer from "./commandReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  appState: appStateReducer,
  commands: commandReducer,
  errors: errorReducer,
});
