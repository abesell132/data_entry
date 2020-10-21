const initialState = {
  popup_type: "NONE",
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
    default:
      return state;
  }
}
