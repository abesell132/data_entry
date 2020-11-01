const initialState = {
  name: "",
  variables: [],
  json: [],
  generated: [],
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
    case "UPDATE_COMMAND_JSON":
      return {
        ...state,
        json: action.payload,
      };
    case "ADD_COMMAND_JSON":
      return {
        ...state,
        json: [...state.json, action.payload],
      };
    case "SET_VARIABLES":
      return {
        ...state,
        variables: action.payload,
      };
    case "CLEAR_VARIABLES":
      return {
        ...state,
        variables: [],
      };
    case "SET_GENERATED_VARIABLES":
      return {
        ...state,
        generated: action.payload,
      };
    case "CLEAR_GENERATED_VARIABLES":
      return {
        ...state,
        generated: [],
      };
    default:
      return state;
  }
}
