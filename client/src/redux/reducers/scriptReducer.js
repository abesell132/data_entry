const initialState = {
  name: "",
  variables: [],
  json: [],
  generated: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @desc    Sets name of currently loaded script
    case "UPDATE_SCRIPT_NAME":
      return {
        ...state,
        name: action.payload,
      };

    // @desc    Updates current script id
    case "UPDATE_CURRENT_SCRIPT":
      return {
        ...state,
        currentScript: action.payload,
      };

    // @desc    Updates current script command list
    case "UPDATE_COMMAND_JSON":
      return {
        ...state,
        json: action.payload,
      };

    // @desc    Sets script variable list (non-generated)
    case "SET_VARIABLES":
      return {
        ...state,
        variables: action.payload,
      };

    // @desc    Sets script generated variable list
    case "SET_GENERATED_VARIABLES":
      return {
        ...state,
        generated: action.payload,
      };

    // @desc    Empty script generated variable array
    case "CLEAR_GENERATED_VARIABLES":
      return {
        ...state,
        generated: [],
      };
    default:
      return state;
  }
}
