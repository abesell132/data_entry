import { combineReducers } from "redux";
import authReducer from "./authReducer";
import appStateReducer from "./appStateReducer";
import errorReducer from "./errorReducer";
import scriptReducer from "./scriptReducer";

export default combineReducers({
  auth: authReducer,
  appState: appStateReducer,
  errors: errorReducer,
  script: scriptReducer,
});
