const initialState = {
  popup_type: "NONE",
  popup_data: {},
  saving: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "CLOSE_POPUP":
      return {
        ...state,
        popup_type: "NONE",
      };
    case "SET_POPUP_TYPE":
      return {
        ...state,
        popup_type: action.payload,
      };
    case "SET_POPUP_DATA":
      return {
        ...state,
        popup_data: action.payload,
      };
    case "TOGGLE_SAVING":
      return {
        ...state,
        saving: !state.saving,
      };
    case "TOGGLE_EXECUTING":
      return {
        ...state,
        executing: !state.executing,
      };
    default:
      return state;
  }
}
