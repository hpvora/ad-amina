import React, { useEffect, useRef, useState } from "react";
import SignIn from "../Component/SignIn";
import SignUp from "../Component/SignUp";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Congratulation from "../Component/Congratulation";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  FacebookAuthProvider,
} from "firebase/auth";
import { app } from "../Configration/firebase";
import { Modal } from "react-bootstrap";
import { loginUser, providerSignUp, userSignUp } from "../action/authConstant";
import { useDispatch, useSelector } from "react-redux";
import { getservice } from "../action/serviceConstant";

const Login = () => {
  const [signUpChange, setsignUpChange] = useState({
    name: "",
    email_address: "",
    mobile_number: "",
    dob: "",
    password: "",
    confirm_password: "",
    country_code: "",
    user_type: "provider",
    is_social_login: false,
    social_id: "",
    social_platform: "",
  });

  const [socialLogin, setsocialLogin] = useState({
    email_address: "",
    is_social_login: true,
    social_id: "",
    social_platform: "",
  });

  const [registration, setregistration] = useState({
    provider_services: [],
    profile_picture: "",
    provider_introduction: "",
    website_links: [""],
    provider_banner_images: [],
    is_other_desc: false,
    other_desc: "",
  });

  const [userRegistration, setuserRegistration] = useState({
    profile_picture: "",
  });

  const [optScreen, setotpScreen] = useState(true);

  const [congratulationScreen, setcongratulationScreen] = useState(false);

  const [profileImage, setprofileImage] = useState("");
  const [userprofileImage, setuserprofileImage] = useState("");
  const [serviceImage, setserviceImage] = useState([]);

  const [serviceOpen, setserviceOpen] = useState(false);

  const [selectServices, setselectServices] = useState([]);

  const [registrationSecound, setregistrationSecound] = useState(false);

  const serviceList = useSelector((state) => state.service.serviceList);

  const [err, seterr] = useState({
    provider_profile: "",
    user_profile: "",
    services_image: "",
    services: "",
  });

  useEffect(() => {
    dispatch(getservice());
  }, []);

  useEffect(() => {
    seterr({
      provider_profile: "",
      user_profile: "",
      services_image: "",
      services: "",
    });
  }, [registrationSecound]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userregistrationSubmite = async (e) => {
    e.preventDefault();

    let validate = true;
    let error = {
      provider_profile: "",
      user_profile: "",
      services_image: "",
      services: "",
    };

    if (userprofileImage == "") {
      error = { ...error, user_profile: "Please Select Profile Image." };
      validate = false;
    }

    seterr(error);
    if (validate) {
      dispatch(userSignUp({ ...signUpChange, ...userRegistration }));
    }
  };

  const loginOrRegistration = (logindata) => {
    const fdata = new FormData();
    fdata.append("email_address", logindata.email_address);

    fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.check_mail}`, {
      method: "POST",
      body: fdata,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setuserTypeModal(true);
          setotpScreen(false);
        } else {
          dispatch(loginUser({ ...logindata }));
          setotpScreen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (congratulationScreen) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [congratulationScreen]);

  const registrationSubmite = async (e) => {
    e.preventDefault();

    let validate = true;
    let error = {
      provider_profile: "",
      user_profile: "",
      services_image: "",
      services: "",
    };

    if (profileImage == "") {
      error = { ...error, provider_profile: "Please Select Profile Image." };
      validate = false;
    }

    if (serviceImage.length < 1) {
      validate = false;
      error = { ...error, services_image: "Please Select Minimum 1 Image." };
    }

    if (selectServices.length < 1) {
      validate = false;
      error = { ...error, services: "Please Select Minimum 1 Service." };
    }

    seterr(error);

    if (validate) {
      dispatch(providerSignUp({ ...signUpChange, ...registration }));
    }
  };

  const googleAuth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(googleAuth, googleProvider)
      .then((data) => {
        setsignUpChange({
          ...signUpChange,
          name: data.user.displayName,
          email_address: data.user.email,
          mobile_number: "",
          dob: "",
          password: "",
          confirm_password: "",
          country_code: "",
          user_type: "provider",
          is_social_login: true,
          social_id: data.user.uid,
          social_platform: "google",
        });
        loginOrRegistration({
          email_address: data.user.email,
          device_type: "web",
          device_token: "jbiusigerihsizdxjdjsi999",
          is_social_login: true,
          social_id: data.user.uid,
          social_platform: "google",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const facebookAuth = getAuth(app);
  const facebookProvider = new FacebookAuthProvider();

  const handleFacebooklogin = () => {
    signInWithPopup(facebookAuth, facebookProvider)
      .then((data) => {
        loginOrRegistration(data.user.email);
        console.log(data.user);
        setsignUpChange({
          ...signUpChange,
          name: data.user.displayName,
          email_address: data.user.email,
          mobile_number: "",
          dob: "",
          password: "",
          confirm_password: "",
          country_code: "",
          user_type: "provider",
          is_social_login: true,
          social_id: data.user.uid,
          social_platform: "google",
        });
        setsocialLogin({
          email_address: data.user.email,
          device_type: "web",
          device_token: "jbiusigerihsizdxjdjsi999",
          is_social_login: true,
          social_id: data.user.uid,
          social_platform: "google",
        });
      })
      .catch((error) => {
        console.error("Error signing in with Facebook:", error);
      });
  };

  const [userTypeModal, setuserTypeModal] = useState(false);

  const loader = useSelector((state) => state.loader);

  useEffect(() => {
    if (registration?.is_other_desc) {
      document
        .querySelector(".list-open.open")
        ?.scrollTo(0, document.querySelector(".list-open.open")?.scrollHeight);
    }
  }, [registration]);

  const [otpData, setotpData] = useState("");

  const otpBox = [useRef(), useRef(), useRef(), useRef()];

  const [otpvalue, setotpvalue] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
  });

  const otpchange = (e, a) => {
    if (e.target.value.length > 0) {
      const kkey = `n${a + 1}`;
      setotpvalue({ ...otpvalue, [kkey]: e.target.value });
      otpBox[a + 1] && otpBox[a + 1].current.focus();
    }
  };

  const otpkeydown = (e, a) => {
    if ((e.target.value == "" && e.key == "Backspace") || e.key == "Delete") {
      const kkey = `n${a}`;
      setotpvalue({ ...otpvalue, [kkey]: "" });
      a - 1 >= 0 && otpBox[a - 1].current.focus();
    } else if ((a == 3 && e.key == "Backspace") || e.key == "Delete") {
      const kkey = `n${a + 1}`;
      setotpvalue({ ...otpvalue, [kkey]: "" });
    }
  };

  const verifyOtp = () => {
    if (
      `${otpvalue.n1}${otpvalue.n2}${otpvalue.n3}${otpvalue.n4}` == otpData &&
      otpData !== ""
    ) {
      setotpScreen(false);
    } else {
      toast.error("Invalid OTP.");
    }
  };

  const sendotp = () => {
    const fdata = new FormData();
    fdata.append("email_address", signUpChange.email_address);
    fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.email_send_otp}`, {
      method: "POST",
      body: fdata,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          setotpData(data?.data);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!registrationSecound ? (
        <>
          <div className="login-screen">
            <div className="frame-parent">
              <div className="group-parent row m-0">
                <div className="group-login-bg col-12 col-sm-5">
                  <div className="text-center">
                    <img
                      className="img-fluid logo"
                      alt=""
                      src="images/logo.png"
                    />
                  </div>
                  <p className="login-using-social text-center mb-3 mb-sm-4">
                    Login using social media to get quick access
                  </p>
                  <button className="btn-login" onClick={() => handleGoogleLogin()}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="google-svgrepo-com 1"
                        clip-path="url(#clip0_21_7815)"
                      >
                        <path
                          id="Vector"
                          d="M3.94967 7.3234C4.64911 5.20397 6.64085 3.68182 9.00001 3.68182C10.2682 3.68182 11.4137 4.13182 12.3137 4.86818L14.9318 2.25C13.3364 0.859091 11.2909 0 9.00001 0C5.45257 0 2.39833 2.02372 0.930008 4.98752L3.94967 7.3234Z"
                          fill="#EA4335"
                        />
                        <path
                          id="Vector_2"
                          d="M12.0306 13.5095C11.2132 14.0372 10.1746 14.3182 9.00002 14.3182C6.64988 14.3182 4.66436 12.8077 3.95776 10.7009L0.928116 13.0013C2.39461 15.9702 5.44877 18 9.00002 18C11.1996 18 13.3015 17.2181 14.8757 15.7497L12.0306 13.5095Z"
                          fill="#34A853"
                        />
                        <path
                          id="Vector_3"
                          d="M14.8757 15.7496C16.5219 14.214 17.5909 11.9276 17.5909 8.99989C17.5909 8.46807 17.5091 7.89534 17.3864 7.36353H9.00002V10.8408H13.8273C13.5891 12.0101 12.9497 12.9158 12.0306 13.5093L14.8757 15.7496Z"
                          fill="#4A90E2"
                        />
                        <path
                          id="Vector_4"
                          d="M3.95775 10.7009C3.77876 10.1673 3.68183 9.59535 3.68183 9.00003C3.68183 8.41374 3.77584 7.85014 3.94966 7.32343L0.930008 4.98755C0.327456 6.19535 1.52588e-05 7.55657 1.52588e-05 9.00003C1.52588e-05 10.4397 0.333601 11.7977 0.928112 13.0013L3.95775 10.7009Z"
                          fill="#FBBC05"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_21_7815">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Continue with Google
                  </button>
                  <button
                    className="btn-login"
                    onClick={() => handleFacebooklogin()}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="facebook-svgrepo-com 2"
                        clip-path="url(#clip0_21_7824)"
                      >
                        <g id="Group">
                          <path
                            id="Vector"
                            d="M8.99997 0C13.9708 0 18 4.02975 18 9.00003C18 13.9709 13.9708 18 8.99997 18C4.02913 18 0 13.9708 0 9.00003C0 4.02975 4.02919 0 8.99997 0Z"
                            fill="#3B5998"
                          />
                          <path
                            id="Vector_2"
                            d="M10.0958 6.19605H11.2557V4.48267H9.89222V4.48885C8.24013 4.54736 7.90153 5.47603 7.87169 6.45142H7.86829V7.30699H6.74332V8.98491H7.86829V13.4826H9.56369V8.98491H10.9525L11.2208 7.30699H9.56424V6.79007C9.56424 6.46044 9.78359 6.19605 10.0958 6.19605Z"
                            fill="white"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_21_7824">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Continue with Facebook
                  </button>
                </div>
                <div className="group col-12 col-sm-7 p-0">
                  <div className="padding-inner">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="login-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#login"
                          type="button"
                          role="tab"
                          aria-controls="login"
                          aria-selected="true"
                        >
                          Login
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="singup-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#singup"
                          type="button"
                          role="tab"
                          aria-controls="singup"
                          aria-selected="false"
                        >
                          Sign up
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <SignIn />
                      <SignUp
                        signUpChange={signUpChange}
                        setsignUpChange={setsignUpChange}
                        setregistrationSecound={setregistrationSecound}
                        sendOtp={sendotp}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {optScreen ? (
            <>
              <div className="login-screen">
                <div className="frame-parent min-screen p-0 ">
                  <div className="group-parent m-0">
                    <div className="group ">
                      <div className="padding-inner pt-2">
                        <a
                          href="#"
                          className="back-button"
                          onClick={(e) => {
                            e.preventDefault();
                            setotpScreen(true);
                            setotpvalue({
                              n1: "",
                              n2: "",
                              n3: "",
                              n4: "",
                            });
                            setregistrationSecound(false);
                          }}
                        >
                          <img src="images/arrow-left.svg" />
                        </a>
                        <div className="text-center">
                          <img
                            className="img-fluid logo"
                            alt=""
                            src="images/logo.png"
                            width="145px"
                          />
                        </div>
                        <form
                          className="login_margin"
                          onSubmit={(e) => {
                            e.preventDefault();
                            verifyOtp();
                            setotpvalue({
                              n1: "",
                              n2: "",
                              n3: "",
                              n4: "",
                            });
                          }}
                        >
                          <h3 className="mb-3 mb-md-3 page-title">
                            OTP Verification
                          </h3>
                          <p className="text-left mb-3 mb-md-4">
                            Check your Email, We’ve sent you PIN at Your Email.
                          </p>
                          <div className="otp-field">
                            <div className="group-input">
                              <input
                                ref={otpBox[0]}
                                type="text"
                                value={otpvalue.n1}
                                maxLength="1"
                                onChange={(e) => {
                                  if (/^\d+$/.test(e.target.value)) {
                                    otpchange(e, 0);
                                  }
                                }}
                                onKeyUp={(e) => otpkeydown(e, 0)}
                              />
                            </div>
                            <div className="group-input">
                              <input
                                ref={otpBox[1]}
                                type="text"
                                value={otpvalue.n2}
                                maxLength="1"
                                onChange={(e) => {
                                  if (/^\d+$/.test(e.target.value)) {
                                    otpchange(e, 1);
                                  }
                                }}
                                onKeyUp={(e) => otpkeydown(e, 1)}
                              />
                            </div>
                            <div className="group-input">
                              <input
                                ref={otpBox[2]}
                                type="text"
                                maxLength="1"
                                value={otpvalue.n3}
                                onChange={(e) => {
                                  if (/^\d+$/.test(e.target.value)) {
                                    otpchange(e, 2);
                                  }
                                }}
                                onKeyUp={(e) => otpkeydown(e, 2)}
                              />
                            </div>
                            <div className="group-input">
                              <input
                                ref={otpBox[3]}
                                type="text"
                                value={otpvalue.n4}
                                maxLength="1"
                                onChange={(e) => {
                                  if (/^\d+$/.test(e.target.value)) {
                                    otpchange(e, 3);
                                  }
                                }}
                                onKeyUp={(e) => otpkeydown(e, 3)}
                              />
                            </div>
                          </div>
                          <div className="btn_gred mt-4">
                            <button type="submit" className="btn_admina">
                              Verify
                            </button>
                          </div>
                          <div className="text-center">
                            <p className="mt-3">Didn’t you recevie any code?</p>
                            <button
                              className="send_link"
                              onClick={(e) => {
                                e.preventDefault();
                                sendotp();
                              }}
                            >
                              Re-send OTP
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {signUpChange.user_type == "provider" ? (
                <>
                  <div className="login-screen">
                    <div className="frame-parent min-screen p-0 ">
                      <div className="group-parent m-0">
                        <div className="group ">
                          <div className="padding-inner pt-2 p-20">
                            <a
                              href="#"
                              className="back-button"
                              onClick={(e) => {
                                e.preventDefault();
                                setotpScreen(true);
                                setregistrationSecound(false);
                              }}
                            >
                              <img src="images/arrow-left.svg" />
                            </a>
                            <div
                              className="text-center"
                              style={{ marginBottom: "-15px" }}
                            >
                              <img
                                className="img-fluid logo"
                                alt=""
                                src="images/logo.png"
                                width="145px"
                              />
                            </div>
                            <form onSubmit={registrationSubmite}>
                              <div className="d-block d-sm-flex align-items-center">
                                <div className="custom-upload">
                                  {profileImage !== "" && (
                                    <>
                                      <img
                                        src={profileImage}
                                        className="profile_uploaded"
                                      />
                                    </>
                                  )}

                                  <input
                                    type="file"
                                    name=""
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => {
                                      const ImageArray = Array.from(
                                        e.target.files
                                      );
                                      if (ImageArray.length > 0) {
                                        setprofileImage(
                                          window.URL.createObjectURL(
                                            ImageArray[0]
                                          )
                                        );
                                        setregistration({
                                          ...registration,
                                          profile_picture: ImageArray[0],
                                        });
                                      }
                                      e.target.value = "";
                                    }}
                                  />
                                  <img
                                    src="images/plus.png"
                                    className="profile_uploaded-after"
                                  />
                                </div>
                                <div className="mt-3 mt-sm-0">
                                  <h4 className="input-label">
                                    Please choose a picture for your profile
                                  </h4>
                                  <p className="input-desc mb-0">
                                    Note: Your Information will only be Viewable
                                    by the providers you choose to interact
                                    with.
                                  </p>
                                </div>
                              </div>
                              {err?.provider_profile !== "" && (
                                <p className="text-danger ps-4">
                                  {err?.provider_profile}
                                </p>
                              )}
                              <div className="mt-3">
                                <h4 className="input-label">
                                  Tell us more about you how would you like to
                                  be introduced?
                                </h4>
                                <textarea
                                  type="text"
                                  required
                                  onChange={(e) => {
                                    setregistration({
                                      ...registration,
                                      provider_introduction: e.target.value,
                                    });
                                  }}
                                  value={registration.provider_introduction}
                                  placeholder=""
                                  className="dashed-border"
                                ></textarea>
                              </div>
                              <div className="mt-3">
                                <h4 className="input-label">
                                  Choose what best describes you
                                </h4>
                                <div className="position-relative">
                                  <div className="group-input mt-2">
                                    <input
                                      type="text"
                                      name=""
                                      placeholder="Select Discription Name"
                                      className="select-servcesss"
                                      onClick={() => {
                                        setserviceOpen(!serviceOpen);
                                      }}
                                    />
                                  </div>
                                  <div
                                    className={
                                      serviceOpen
                                        ? "list-open open"
                                        : "list-open"
                                    }
                                    style={{ scrollBehavior: "smooth" }}
                                  >
                                    {serviceList?.map((data) => {
                                      return (
                                        <>
                                          <div className="group-input-check position-relative my-2">
                                            <div className="">
                                              {data?.description_name ==
                                              "Other" ? (
                                                <>
                                                  <label className="gred-checkbox">
                                                    {data?.description_name}
                                                    <input
                                                      type="checkbox"
                                                      checked={registration.provider_services.includes(
                                                        data._id
                                                      )}
                                                      onClick={() => {
                                                        let available = false;
                                                        let selectSer =
                                                          selectServices?.filter(
                                                            (value) => {
                                                              if (
                                                                value.service_id !==
                                                                data._id
                                                              ) {
                                                                return value;
                                                              }
                                                            }
                                                          );
                                                        let newValue =
                                                          registration?.provider_services?.filter(
                                                            (value) => {
                                                              if (
                                                                registration?.provider_services.includes(
                                                                  data._id
                                                                )
                                                              ) {
                                                                available = true;
                                                              }
                                                              if (
                                                                value !==
                                                                data._id
                                                              ) {
                                                                return value;
                                                              }
                                                            }
                                                          );
                                                        if (available) {
                                                          setregistration({
                                                            ...registration,
                                                            provider_services:
                                                              newValue,
                                                            is_other_desc: false,
                                                            other_desc: "",
                                                          });
                                                          setselectServices(
                                                            selectSer
                                                          );
                                                        } else {
                                                          if (
                                                            registration
                                                              ?.provider_services
                                                              ?.length < 7
                                                          ) {
                                                            setregistration({
                                                              ...registration,
                                                              provider_services:
                                                                [
                                                                  ...registration.provider_services,
                                                                  data._id,
                                                                ],
                                                              is_other_desc: true,
                                                            });
                                                            setselectServices([
                                                              ...selectSer,
                                                              {
                                                                service_id:
                                                                  data?._id,
                                                                amount:
                                                                  data?.admin_service_amount,
                                                                description_name:
                                                                  data?.description_name,
                                                              },
                                                            ]);
                                                          } else {
                                                            toast.error(
                                                              "You can't select more than 7 description name."
                                                            );
                                                          }
                                                        }
                                                      }}
                                                    />
                                                    <span className="checkmark"></span>
                                                  </label>
                                                  {registration?.is_other_desc && (
                                                    <>
                                                      <div
                                                        className="group-input"
                                                        style={{
                                                          margin:
                                                            "10px 0 10px 0",
                                                        }}
                                                      >
                                                        <input
                                                          type="text"
                                                          style={{
                                                            padding: "15px",
                                                          }}
                                                          required
                                                          value={
                                                            registration.other_desc
                                                          }
                                                          onChange={(e) => {
                                                            setregistration({
                                                              ...registration,
                                                              other_desc:
                                                                e.target.value,
                                                            });
                                                          }}
                                                          placeholder="Other Discription"
                                                        />
                                                      </div>
                                                    </>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  <label className="gred-checkbox">
                                                    {data?.description_name}
                                                    <input
                                                      type="checkbox"
                                                      checked={registration.provider_services.includes(
                                                        data._id
                                                      )}
                                                      onClick={() => {
                                                        let available = false;
                                                        let selectSer =
                                                          selectServices?.filter(
                                                            (value) => {
                                                              if (
                                                                value.service_id !==
                                                                data._id
                                                              ) {
                                                                return value;
                                                              }
                                                            }
                                                          );
                                                        let newValue =
                                                          registration?.provider_services?.filter(
                                                            (value) => {
                                                              if (
                                                                registration?.provider_services.includes(
                                                                  data._id
                                                                )
                                                              ) {
                                                                available = true;
                                                              }
                                                              if (
                                                                value !==
                                                                data._id
                                                              ) {
                                                                return value;
                                                              }
                                                            }
                                                          );
                                                        if (available) {
                                                          setregistration({
                                                            ...registration,
                                                            provider_services:
                                                              newValue,
                                                          });
                                                          setselectServices(
                                                            selectSer
                                                          );
                                                        } else {
                                                          if (
                                                            registration
                                                              ?.provider_services
                                                              ?.length < 7
                                                          ) {
                                                            setregistration({
                                                              ...registration,
                                                              provider_services:
                                                                [
                                                                  ...registration.provider_services,
                                                                  data._id,
                                                                ],
                                                            });
                                                            setselectServices([
                                                              ...selectSer,
                                                              {
                                                                service_id:
                                                                  data?._id,
                                                                amount:
                                                                  data?.admin_service_amount,
                                                                description_name:
                                                                  data?.description_name,
                                                              },
                                                            ]);
                                                          } else {
                                                            toast.error(
                                                              "You can't select more than 7 description name."
                                                            );
                                                          }
                                                        }
                                                      }}
                                                    />
                                                    <span className="checkmark"></span>
                                                  </label>
                                                </>
                                              )}
                                            </div>
                                            {/* <h4 className="float-end">
                                          {data?.admin_service_amount}
                                        </h4> */}
                                          </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="selected-item clearfix">
                                  {selectServices.map((value, i) => {
                                    return `${i + 1}. ${
                                      value.description_name
                                    }, `;
                                  })}
                                </div>
                              </div>
                              {err?.services !== "" && (
                                <p className="text-danger ps-4">
                                  {err?.services}
                                </p>
                              )}
                              <div className="mt-3">
                                <h4 className="input-label float-start">
                                  Do you have a website?, or more links?
                                </h4>
                                <span
                                  className="plus-icon float-end"
                                  onClick={() => {
                                    setregistration({
                                      ...registration,
                                      website_links: [
                                        ...registration.website_links,
                                        "",
                                      ],
                                    });
                                  }}
                                >
                                  <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="add">
                                      <g id="vuesax/outline/add">
                                        <g id="add_2">
                                          <path
                                            id="Vector"
                                            d="M22.5 15.9375H7.5C6.9875 15.9375 6.5625 15.5125 6.5625 15C6.5625 14.4875 6.9875 14.0625 7.5 14.0625H22.5C23.0125 14.0625 23.4375 14.4875 23.4375 15C23.4375 15.5125 23.0125 15.9375 22.5 15.9375Z"
                                            fill="#292D32"
                                          />
                                          <path
                                            id="Vector_2"
                                            d="M15 23.4375C14.4875 23.4375 14.0625 23.0125 14.0625 22.5V7.5C14.0625 6.9875 14.4875 6.5625 15 6.5625C15.5125 6.5625 15.9375 6.9875 15.9375 7.5V22.5C15.9375 23.0125 15.5125 23.4375 15 23.4375Z"
                                            fill="#292D32"
                                          />
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                                {registration?.website_links?.map((data, i) => {
                                  return (
                                    <>
                                      <div className="group-input mt-2 p-15 clearfix">
                                        <input
                                          type="url"
                                          name=""
                                          value={registration?.website_links[i]}
                                          onChange={(e) => {
                                            const newValue =
                                              registration?.website_links?.map(
                                                (value, j) => {
                                                  if (i == j) {
                                                    return e.target.value;
                                                  } else {
                                                    return value;
                                                  }
                                                }
                                              );
                                            setregistration({
                                              ...registration,
                                              website_links: newValue,
                                            });
                                          }}
                                          placeholder="Your Link here"
                                        />
                                        {registration?.website_links?.length >
                                          1 && (
                                          <>
                                            <span
                                              className="remove new-remove"
                                              style={{
                                                top: "16px",
                                                right: "16px",
                                              }}
                                              onClick={() => {
                                                setregistration({
                                                  ...registration,
                                                  website_links:
                                                    registration?.website_links?.filter(
                                                      (datanew, j) => {
                                                        return i !== j;
                                                      }
                                                    ),
                                                });
                                              }}
                                            >
                                              <svg
                                                style={{ position: "initial" }}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g id="Icons">
                                                  <path
                                                    id="Vector"
                                                    d="M12.3865 12.8635L7.61351 8.09054M7.61351 12.8635L12.3865 8.09054"
                                                    stroke="#FF0000"
                                                    strokeWidth="1.39212"
                                                    stroke-linecap="round"
                                                  ></path>
                                                </g>
                                              </svg>
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>

                              <div className="mt-3">
                                <h4 className="input-label">
                                  Upload Services Pictures
                                </h4>
                                <div className="multi_imgs mt-2">
                                  {serviceImage?.map((value, i) => {
                                    return (
                                      <>
                                        <div className="hexagone">
                                          <span
                                            className="remove"
                                            onClick={() => {
                                              const newImage =
                                                serviceImage?.filter(
                                                  (data, j) => {
                                                    return i !== j;
                                                  }
                                                );
                                              const newFormData =
                                                registration.provider_banner_images?.filter(
                                                  (data, j) => {
                                                    return i !== j;
                                                  }
                                                );

                                              setserviceImage(newImage);
                                              setregistration({
                                                ...registration,
                                                provider_banner_images:
                                                  newFormData,
                                              });
                                            }}
                                          >
                                            <svg
                                              width="20"
                                              height="20"
                                              viewBox="0 0 20 20"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <g id="Icons">
                                                <path
                                                  id="Vector"
                                                  d="M12.3865 12.8635L7.61351 8.09054M7.61351 12.8635L12.3865 8.09054"
                                                  stroke="#FF0000"
                                                  strokeWidth="1.39212"
                                                  stroke-linecap="round"
                                                />
                                              </g>
                                            </svg>
                                          </span>
                                          <img src={value} />
                                        </div>
                                      </>
                                    );
                                  })}
                                  {serviceImage.length < 7 && (
                                    <>
                                      <div className="d-inline-block">
                                        <div className="custom-upload-2">
                                          <input
                                            type="file"
                                            name=""
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => {
                                              const ImageArray = Array.from(
                                                e.target.files
                                              );
                                              if (ImageArray.length > 0) {
                                                setserviceImage([
                                                  ...serviceImage,
                                                  window.URL.createObjectURL(
                                                    ImageArray[0]
                                                  ),
                                                ]);
                                                setregistration({
                                                  ...registration,
                                                  provider_banner_images: [
                                                    ...registration.provider_banner_images,
                                                    ...ImageArray,
                                                  ],
                                                });
                                              }
                                              e.target.value = "";
                                            }}
                                          />
                                          <img src="images/plus.png" />
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              {err?.services_image !== "" && (
                                <p className="text-danger ps-4">
                                  {err?.services_image}
                                </p>
                              )}

                              <div className="btn_gred mt-3">
                                {loader ? (
                                  <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className="btn_admina "
                                  >
                                    {/* save */}
                                    <div className="loader"></div>
                                  </a>
                                ) : (
                                  <button type="submit" className="btn_admina ">
                                    Continue
                                  </button>
                                )}
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {!congratulationScreen ? (
                    <>
                      <div className="login-screen">
                        <div
                          className="frame-parent min-screen p-0 "
                          style={{ minHeight: "auto" }}
                        >
                          <div className="group-parent m-0">
                            <div className="group ">
                              <div className="padding-inner pt-2">
                                <a
                                  href="#"
                                  className="back-button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setotpScreen(true);
                                    setregistrationSecound(false);
                                  }}
                                >
                                  <img src="images/arrow-left.svg" />
                                </a>
                                <div className="text-center">
                                  <img
                                    className="img-fluid logo"
                                    alt=""
                                    src="images/logo.png"
                                    width="145px"
                                  />
                                </div>
                                <form
                                  className="login_margin mt-0"
                                  onSubmit={(e) => userregistrationSubmite(e)}
                                >
                                  <h3 className="mb-3 mb-md-3 page-title text-center f-18">
                                    Please choose a picture for your profile
                                  </h3>
                                  <div className="text-center user-profile">
                                    <div className="custom-upload ">
                                      {userprofileImage !== "" && (
                                        <img
                                          src={userprofileImage}
                                          className="profile_uploaded"
                                        />
                                      )}
                                      <input
                                        type="file"
                                        name=""
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => {
                                          const ImageArray = Array.from(
                                            e.target.files
                                          );
                                          if (ImageArray.length > 0) {
                                            setuserprofileImage(
                                              window.URL.createObjectURL(
                                                ImageArray[0]
                                              )
                                            );
                                            setuserRegistration({
                                              profile_picture: ImageArray[0],
                                            });
                                          }
                                          e.target.value = "";
                                        }}
                                      />
                                      <img
                                        src="images/plus.png"
                                        className="profile_uploaded-after"
                                      />
                                    </div>
                                  </div>
                                  <p className="text-center mb-3 mb-md-4 max-width-300">
                                    Note: Your Information will only be Viewable
                                    by the providers you choose to interact
                                    with.
                                  </p>
                                  {err?.user_profile !== "" && (
                                    <p className="text-danger text-center">
                                      {err?.user_profile}
                                    </p>
                                  )}

                                  <div className="btn_gred mt-4">
                                    <div className="btn_gred mt-3">
                                      {loader ? (
                                        <a
                                          href="#"
                                          onClick={(e) => e.preventDefault()}
                                          className="btn_admina "
                                        >
                                          {/* save */}
                                          <div className="loader"></div>
                                        </a>
                                      ) : (
                                        <button
                                          type="submit"
                                          className="btn_admina "
                                        >
                                          Continue
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Congratulation />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}

      <Modal
        centered
        show={userTypeModal}
        onHide={() => {
          setuserTypeModal(false);
        }}
      >
        <h3 className="mb-3 mt-3 text-center">Are you a Provider?</h3>
        <div className="btn_gred mt-3">
          <button
            className="btn_admina"
            onClick={() => {
              setsignUpChange({ ...signUpChange, user_type: "provider" });
              setuserTypeModal(false);
              setregistrationSecound(true);
            }}
          >
            Yes
          </button>
          <button
            className="btn_admina"
            onClick={() => {
              setsignUpChange({ ...signUpChange, user_type: "user" });
              setuserTypeModal(false);
              setregistrationSecound(true);
            }}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Login;
