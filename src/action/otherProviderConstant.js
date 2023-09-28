import { toast } from "react-toastify";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { otherProviderConstant } from "./constant";


export const getOtherProvider = (userId) => {
  return async (dispatch) => {
    let response;
    const fdata = new FormData();
    fdata.append("user_id", userId);
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.user_details}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("AdAnima_auth"))?.token
        }`,
      },
      body: fdata,
    })
      .then((response) => response.json())
      .then((data) => {
        response = data;
      })
      .catch((err) => {
        console.log(err);
      });

    if (response?.success) {
      dispatch({
        type: otherProviderConstant.GET_OTHER_PROVIDER_DETAILS,
        payload: response.data,
      });
    } else {
      toast.error(response?.message);
    }
  };
};
