const initialState = {
  list: [],
  json: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case "UPDATE_COMMAND_LIST":
    //   return {
    //     ...state,
    //     list: action.payload,
    //   };
    // case "UPDATE_COMMAND_JSON":
    //   return {
    //     ...state,
    //     json: action.payload,
    //   };
    // case "ADD_COMMAND_LIST":
    //   return {
    //     ...state,
    //     list: [...state.list, action.payload],
    //   };
    // case "ADD_COMMAND_JSON":
    //   return {
    //     ...state,
    //     json: [...state.json, action.payload],
    //   };
    default:
      return state;
  }
}
