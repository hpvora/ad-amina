import { toast } from "react-toastify";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { serviceConstant } from "./constant";

export const getservice = () => {
  return async (dispatch) => {
    let response;
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.service_list}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        response = data;
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(response);

    if (response?.success) {
      dispatch({
        type: serviceConstant.GET_SERVICE,
        payload: response.data,
      });
    } else {
      toast.error(response?.message);
    }
  };
};
