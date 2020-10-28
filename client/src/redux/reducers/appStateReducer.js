const initialState = {
  popup_type: "NONE",
  popup_data: {},
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
    default:
      return state;
  }
}
