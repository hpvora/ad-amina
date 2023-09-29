import { toast } from "react-toastify";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { myPageConstant, otherProviderConstant } from "./constant";


export const getMyPageDetails = (userId) => {
  return async (dispatch) => {
    let response;
    const fdata = new FormData();
    fdata.append("user_id", JSON.parse(localStorage.getItem("AdAnima_auth"))?._id);
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.get_my_page_details}`, {
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
        type : myPageConstant.GET_MY_PAGE_DETAILS,
        payload : response.data,
      });
    } else {
      toast.error(response?.message);
    }
  };
};
