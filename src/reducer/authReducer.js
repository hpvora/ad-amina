import { authConstant } from "../action/constant";

const initialState = JSON.parse(localStorage.getItem("AdAnima_auth"));

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstant.LOGGIN_USER:
      return action.payload;
    case authConstant.LOGOUT:
      return null;
  }
  return state;
};
