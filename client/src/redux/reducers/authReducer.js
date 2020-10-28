import isEmpty from "../../validation/is-empty";

const initialState = {
  accountScripts: [],
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case "UPDATE_SCRIPT_LIST":
      return {
        ...state,
        accountScripts: action.payload,
      };
    default:
      return state;
  }
}
