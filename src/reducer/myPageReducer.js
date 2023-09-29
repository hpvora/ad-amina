import { serviceConstant, userConstant, myPageConstant } from "../action/constant";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case myPageConstant.GET_MY_PAGE_DETAILS:
      return action.payload;
  }
  return state;
};
