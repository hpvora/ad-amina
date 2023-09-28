import { userConstant } from "../action/constant";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstant.GET_USER_DETAILS:
      return action.payload;
  }
  return state;
};
