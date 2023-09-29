import { otherProviderConstant } from "../action/constant";

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case otherProviderConstant.GET_OTHER_PROVIDER_DETAILS:
      return action.payload;
  }
  return state;
};
