import {
  serviceConstant,
  userConstant,
  userServiceConstant,
} from "../action/constant";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case userServiceConstant.GET_USER_SERVICE:
      return action.payload;
    case userServiceConstant.FETCH_MORE_SERVICE:
      return [...state, ...action.payload];
    case userServiceConstant.SAVE_SERVICE:
      console.log("Saving", action.payload)
      return state.map((data) => {
        if (data._id == action.payload.id) {
          return { ...data, is_save: action.payload.status };
        } else {
          return data;
        }
      });
  }
  return state;
};
