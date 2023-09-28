import { toast } from "react-toastify";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { authConstant, loaderConstant, userConstant } from "./constant";
import { logoutUser } from "./authConstant";

export const getUserDetails = (userId) => {
  return async (dispatch) => {
    let response;
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.user_details}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("AdAnima_auth"))?.token
        }`,
      },
      body: JSON.stringify({
        user_id: userId,
      }),
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
        type: userConstant.GET_USER_DETAILS,
        payload: response.data,
      });
    } else {
      if(response?.statuscode == 101){
        localStorage.removeItem("AdAnima_auth");
        dispatch({
          type: authConstant.LOGOUT,
          payload: null,
        });
      }
      toast.error(response?.message);
    }
    dispatch({
      type: loaderConstant.LOADER,
      payload: false,
    });
  };
};

export const editUserDetails = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: loaderConstant.LOADER,
      payload: true,
    });
    let response;
    const fdata = new FormData();
    fdata.append(
      "user_id",
      JSON.parse(localStorage.getItem("AdAnima_auth"))?._id
    );
    fdata.append("user_type", userData.user_type);
    fdata.append("name", userData.name);
    fdata.append("email_address", userData.email_address);
    fdata.append("country_code", userData.country_code);
    fdata.append("mobile_number", userData.mobile_number);

    const newdate = new Date(userData.dob);
    fdata.append("dob", newdate.toISOString());
    if (userData.profile_picture !== "") {
      fdata.append("profile_picture", userData.profile_picture);
    }

    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.edit_profile}`, {
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
      dispatch(getUserDetails());
      toast.success(response?.message);
      localStorage.setItem(
        "AdAnima_auth",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("AdAnima_auth")),
          ...response.data,
        })
      );
    } else {
      toast.error(response?.message);
    }
  };
};

export const editProviderDetails = (userData) => {
  const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));
  return async (dispatch) => {
    dispatch({
      type: loaderConstant.LOADER,
      payload: true,
    });
    let response;
    const fdata = new FormData();
    fdata.append("user_type", userData.user_type);
    fdata.append("user_id", userAuth?._id);
    fdata.append("name", userData.name);
    fdata.append("email_address", userData.email_address);
    fdata.append("country_code", userData.country_code);
    fdata.append("mobile_number", userData.mobile_number);

    const newdate = new Date(userData.dob);
    fdata.append("dob", newdate.toISOString());
    fdata.append("is_lightworker", true);
    if (userData.profile_picture !== "") {
      fdata.append("profile_picture", userData.profile_picture);
    }
    fdata.append(
      "provider_services",
      JSON.stringify(userData.provider_services)
    );
    fdata.append("provider_introduction", userData.provider_introduction);
    if (userData.provider_banner_images.length > 0) {
      for (let i = 0; i < userData.provider_banner_images.length; i++) {
        fdata.append(
          "provider_banner_images",
          userData.provider_banner_images[i]
        );
      }
    }
    fdata.append("website_links", JSON.stringify(userData.website_links));

    fdata.append(
      "delete_banner_image_ids",
      JSON.stringify(userData.delete_banner_image_ids)
    );

    fdata.append("is_other_desc", userData.is_other_desc);

    if (userData.is_other_desc) {
      fdata.append("other_desc", userData.other_desc);
    }

    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.edit_profile}`, {
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

    if (response?.success) {
      dispatch(getUserDetails());
      toast.success(response?.message);
      localStorage.setItem(
        "AdAnima_auth",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("AdAnima_auth")),
          ...response.data,
        })
      );
    } else {
      toast.error(response?.message);
    }
  };
};
