export const togglePopup = () => (dispatch) => {
  dispatch({ type: "CLOSE_POPUP" });
};

export const setPopupType = (type) => (dispatch) => {
  console.log(type);
  dispatch({ type: "SET_POPUP_TYPE", payload: type });
};

export const closePopup = () => (dispatch) => {
  dispatch({ type: "CLOSE_POPUP" });
};
