import { combineReducers } from "redux";

import authData from "./authReducer";
import userData from "./userReducer";
import serviceData from "./serviceReducer";
import loaderData from "./loaderReducer";
import userServiceList from "./userServiceReducer";
import otherProviderDetails from "./otherProviderReducer";
import myPageDetails from './myPageReducer'

const rootReducer = combineReducers({
  auth: authData,
  user: userData,
  service: serviceData,
  loader: loaderData,
  userServiceList : userServiceList,
  otherProviderDetails : otherProviderDetails,
  myPageDetails : myPageDetails
});

export default rootReducer;
