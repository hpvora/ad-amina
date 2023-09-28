import { serviceConstant, userConstant } from "../action/constant";

const initialState = { serviceList: [], userService: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case serviceConstant.GET_SERVICE:
      return { ...state, serviceList: action.payload };
  }
  return state;
};
