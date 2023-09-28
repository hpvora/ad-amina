import { toast } from "react-toastify";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { authConstant, loaderConstant } from "./constant";

export const loginUser = (loginData) => {
  return async (dispatch) => {
    dispatch({
      type: loaderConstant.LOADER,
      payload: true,
    });

    let response;
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.login}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: loginData.is_social_login
        ? JSON.stringify({
            email_address: loginData.email_address,
            device_type: "web",
            device_token: "jbiusigerihsizdxjdjsi999",
            is_social_login: true,
            social_id: loginData.social_id,
            social_platform: loginData.social_platform,
          })
        : JSON.stringify({
            email_address: loginData.email,
            password: loginData.password,
            device_token: "jbiusigerihsizdxjdjsi999",
            device_type: "web",
          }),
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
        type: authConstant.LOGGIN_USER,
        payload: response.data,
      });
      localStorage.setItem("AdAnima_auth", JSON.stringify(response.data));
      if (loginData.remember) {
        localStorage.setItem("AdAnima_remember", JSON.stringify(loginData));
      }
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
    dispatch({
      type: loaderConstant.LOADER,
      payload: false,
    });
  };
};

export const providerSignUp = (UserData) => {
  return async (dispatch) => {
    dispatch({
      type: loaderConstant.LOADER,
      payload: true,
    });
    let response;
    const fdata = new FormData();
    if (UserData.is_social_login) {
      fdata.append("is_social_login", UserData.is_social_login);
      fdata.append("social_id", UserData.social_id);
      fdata.append("social_platform", UserData.social_platform);
    } else {
      fdata.append("country_code", UserData.country_code);
      fdata.append("mobile_number", UserData.mobile_number);

      const newdate = new Date(UserData.dob);
      fdata.append("dob", newdate.toISOString());
      fdata.append("password", UserData.password);
    }
    fdata.append("user_type", UserData.user_type);
    fdata.append("name", UserData.name);
    fdata.append("email_address", UserData.email_address);

    fdata.append("is_other_desc", UserData.is_other_desc);

    if (UserData.is_other_desc) {
      fdata.append("other_desc", UserData.other_desc);
    }

    fdata.append("is_lightworker", true);
    fdata.append("profile_picture", UserData.profile_picture);
    fdata.append(
      "provider_services",
      JSON.stringify(UserData.provider_services)
    );
    fdata.append("provider_introduction", UserData.provider_introduction);
    if (UserData.provider_banner_images?.length > 0) {
      for (let i = 0; i < UserData.provider_banner_images?.length; i++) {
        fdata.append(
          "provider_banner_images",
          UserData.provider_banner_images[i]
        );
      }
    }
    fdata.append("website_links", JSON.stringify(UserData.website_links));
    fdata.append("device_type", "web");
    fdata.append("device_token", "webtoken0123456789");

    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.sign_up}`, {
      method: "POST",
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
        type: authConstant.LOGGIN_USER,
        payload: response.data,
      });
      localStorage.setItem("AdAnima_auth", JSON.stringify(response.data));
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
    dispatch({
      type: loaderConstant.LOADER,
      payload: false,
    });
  };
};

export const userSignUp = (UserData) => {
  return async (dispatch) => {
    dispatch({
      type: loaderConstant.LOADER,
      payload: true,
    });
    let response;
    const fdata = new FormData();
    if (UserData.is_social_login) {
      fdata.append("is_social_login", UserData.is_social_login);
      fdata.append("social_id", UserData.social_id);
      fdata.append("social_platform", UserData.social_platform);
    } else {
      fdata.append("country_code", UserData.country_code);
      fdata.append("mobile_number", UserData.mobile_number);

      const newdate = new Date(UserData.dob);
      fdata.append("dob", newdate.toISOString());
      fdata.append("password", UserData.password);
    }
    fdata.append("user_type", UserData.user_type);
    fdata.append("name", UserData.name);
    fdata.append("email_address", UserData.email_address);
    fdata.append("is_lightworker", false);
    fdata.append("profile_picture", UserData.profile_picture);
    fdata.append("device_type", "web");
    fdata.append("device_token", "webtoken0123456789");

    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.sign_up}`, {
      method: "POST",
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
        type: authConstant.LOGGIN_USER,
        payload: response.data,
      });
      localStorage.setItem("AdAnima_auth", JSON.stringify(response.data));
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
    dispatch({
      type: loaderConstant.LOADER,
      payload: false,
    });
  };
};

export const logoutUser = (loginData) => {
  const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));
  return async (dispatch) => {
    let response;
    const fdata = new FormData();
    fdata.append("user_id", userAuth?._id);
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.logout}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
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
      localStorage.removeItem("AdAnima_auth");
      toast.success(response?.message);
      dispatch({
        type: authConstant.LOGOUT,
        payload: null,
      });
    } else {
      toast.error(response?.message);
    }
  };
};

export const deleteUser = (loginData) => {
  const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));
  return async (dispatch) => {
    let response;
    const fdata = new FormData();
    fdata.append("user_id", userAuth?._id);
    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.delete_user}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
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
      localStorage.removeItem("AdAnima_auth");
      toast.success(response?.message);
      dispatch({
        type: authConstant.LOGOUT,
        payload: null,
      });
    } else {
      toast.error(response?.message);
    }
  };
};
