const initialState = {
  name: "",
  variables: [],
  json: [],
  list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UPDATE_SCRIPT_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "UPDATE_CURRENT_SCRIPT":
      return {
        ...state,
        currentScript: action.payload,
      };
    case "UPDATE_COMMAND_LIST":
      return {
        ...state,
        list: action.payload,
      };
    case "UPDATE_COMMAND_JSON":
      return {
        ...state,
        json: action.payload,
      };
    case "ADD_COMMAND_LIST":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "ADD_COMMAND_JSON":
      return {
        ...state,
        json: [...state.json, action.payload],
      };
    case "ADD_VARIABLES":
      return {
        ...state,
        variables: action.payload,
      };
    case "CLEAR_VARIABLES":
      return {
        ...state,
        variables: [],
      };
    default:
      return state;
  }
}
