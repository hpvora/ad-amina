import {
  loaderConstant,
  serviceConstant,
  userConstant,
} from "../action/constant";

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case loaderConstant.LOADER:
      return action.payload;
  }
  return state;
};
