import { toast } from "react-toastify";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { serviceConstant, userServiceConstant } from "./constant";

export const getUserService = (props) => {
  return async (dispatch) => {
    const fdata = new FormData();
    fdata.append("page", props.page);
    fdata.append("limit", props.limit);
    if (props.latLong) {
      fdata.append("lat", props.latLong.lat);
      fdata.append("long", props.latLong.lng);
    }

    if (props?.service_id?.length > 0) {
      fdata.append("service_id", JSON.stringify(props.service_id));
    }

    let response;
    const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.home_service_list}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
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

    console.log(response);

    if (response?.success) {
      dispatch({
        type: userServiceConstant.GET_USER_SERVICE,
        payload: response.data,
      });
    } else {
      toast.error(response?.message);
    }
  };
};

export const fetchMoreService = (props) => {
  return async (dispatch) => {
    const fdata = new FormData();
    fdata.append("page", props.page);
    fdata.append("limit", props.limit);
    if (props.latLong) {
      fdata.append("lat", props.latLong.lat);
      fdata.append("long", props.latLong.lng);
    }

    if (props?.service_id?.length > 0) {
      fdata.append("service_id", JSON.stringify(props.service_id));
    }

    let response;
    const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.home_service_list}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
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

    console.log(response);

    if (response?.success) {
      dispatch({
        type: userServiceConstant.FETCH_MORE_SERVICE,
        payload: response.data,
      });
    } else {
      toast.error(response?.message);
    }
  };
};

export const saveService = (props) => {
  return async (dispatch) => {
    const fdata = new FormData();
    fdata.append("service_id", props.id);
    fdata.append("is_save_status", props.status);
    
    let response;
    const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.save_service}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
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

    console.log(response);

    if (response?.success) {
      dispatch({
        type: userServiceConstant.SAVE_SERVICE,
        payload: {...props},
      });
      toast.success(response?.message)
    } else {
      toast.error(response?.message);
    }
  };
};
