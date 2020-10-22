const initialState = {
  accountScripts: [],
  currentScript: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UPDATE_SCRIPT_LIST":
      return {
        ...state,
        accountScripts: action.payload,
      };
    case "UPDATE_CURRENT_SCRIPT":
      return {
        ...state,
        currentScript: action.payload,
      };
    default:
      return state;
  }
}
