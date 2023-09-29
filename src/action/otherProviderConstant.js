import { toast } from "react-toastify";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { otherProviderConstant } from "./constant";

export const getOtherProvider = (userId) => {
  return async (dispatch) => {
    let response = {};
    let success = { status: false, message: "" };
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
        response = data.data;
        success = { status: data?.success, message: data?.message };
      })
      .catch((err) => {
        console.log(err);
      });

    const Providerdata = new FormData();
    Providerdata.append("provider_id", userId);
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.user_rating}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("AdAnima_auth"))?.token
        }`,
      },
      body: Providerdata,
    })
      .then((response) => response.json())
      .then((data) => {
        response = { ...response, retingList: data.data };
        success = { status: data?.success, message: data?.message };
      })
      .catch((err) => {
        console.log(err);
      });

    if (success?.status) {
      dispatch({
        type: otherProviderConstant.GET_OTHER_PROVIDER_DETAILS,
        payload: response,
      });
    } else {
      toast.error(success?.message);
    }
  };
};
