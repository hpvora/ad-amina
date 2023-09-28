import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";

const ForgetPassword = () => {
  const [formChange, setformChange] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const [passwordShow, setpasswordShow] = useState({
    password: false,
    confirm_password: false,
  });

  const [tab, settab] = useState("forgot-password");

  const otpBox = [useRef(), useRef(), useRef(), useRef()];
  const [otpvalue, setotpvalue] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
  });

  const [passwordChange, setpasswordChange] = useState({
    password: "",
    confirm_password: "",
  });

  const [err, seterr] = useState({
    password: "",
  });

  const sendotp = () => {
    const fdata = new FormData();
    fdata.append("email_address", formChange.email);
    fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.send_otp}`, {
      method: "POST",
      body: fdata,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          settab("otp");
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyOtp = () => {
    const fdata = new FormData();
    fdata.append("email_address", formChange.email);
    fdata.append("otp", `${otpvalue.n1}${otpvalue.n2}${otpvalue.n3}${otpvalue.n4}`);

    fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.verify_otp}`, {
      method: "POST",
      body: fdata,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          settab("change-password");
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const passwordSubmit = () => {
    const fdata = new FormData();
    fdata.append("email_address", formChange.email);
    fdata.append("password",passwordChange.password);
    if (passwordChange.password !== passwordChange.confirm_password) {
      seterr({
        ...err,
        password: "passsword and confirm password does not match.",
      });
    } else {
      seterr({
        ...err,
        password: "",
      });
      fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.reset_password}`, {
        method: "POST",
        body: fdata,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
            setpasswordChange({
              password: "",
              confirm_password: "",
            });
            navigate("/login");
          } else {
            toast.error(data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      {tab == "forgot-password" && (
        <>
          <div class="login-screen">
            <div class="frame-parent min-screen p-0 ">
              <div class="group-parent m-0">
                <div class="group ">
                  <div class="padding-inner pt-2">
                    <Link to={"/login"} class="back-button">
                      <img src="images/arrow-left.svg" />
                    </Link>
                    <div class="text-center">
                      <img
                        class="img-fluid logo"
                        alt=""
                        src="images/logo.png"
                        width="145px"
                      />
                    </div>
                    <form
                      class="login_margin"
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendotp();
                      }}
                    >
                      <h3 class="mb-3 mb-md-3 page-title">Forgot Password,</h3>
                      <p class="text-left mb-3 mb-md-4">
                        Enter Your Email And Get OTP
                      </p>
                      <div class="group-input">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Icons">
                            <path
                              id="Vector"
                              d="M2.88539 8.84875C3.55805 6.13983 5.70602 4.04534 8.43056 3.44162L8.88443 3.34105C10.9366 2.88632 13.0634 2.88632 15.1156 3.34105L15.5694 3.44162C18.294 4.04534 20.442 6.13984 21.1146 8.84875C21.6285 10.9182 21.6285 13.0819 21.1146 15.1512C20.442 17.8602 18.294 19.9547 15.5694 20.5584L15.1156 20.659C13.0634 21.1137 10.9366 21.1137 8.88443 20.659L8.43056 20.5584C5.70601 19.9547 3.55805 17.8602 2.88539 15.1513C2.37154 13.0819 2.37154 10.9181 2.88539 8.84875Z"
                              stroke="#363853"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              id="Vector_2"
                              d="M21.1146 15.1512C21.6285 13.0819 21.6285 10.9182 21.1146 8.84875C20.442 6.13984 18.294 4.04534 15.5694 3.44162L15.1156 3.34105C13.0634 2.88632 10.9366 2.88632 8.88443 3.34105L8.43056 3.44162C5.70602 4.04534 3.55805 6.13983 2.88539 8.84875C2.37154 10.9181 2.37154 13.0819 2.88539 15.1513C3.55805 17.8602 5.70601 19.9547 8.43056 20.5584L8.88443 20.659"
                              stroke="#363853"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              id="Vector_3"
                              d="M8.15112 10.3501L10.7216 12.1866C11.4864 12.7329 12.5136 12.7329 13.2783 12.1866L15.8489 10.3501"
                              stroke="#363853"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </g>
                        </svg>
                        <input
                          type="email"
                          name=""
                          value={formChange.email}
                          onChange={(e) => {
                            setformChange({ email: e.target.value });
                          }}
                          required
                          placeholder="Email Address"
                        />
                      </div>

                      <div class="btn_gred mt-4">
                        <button type="submit" class="btn_admina ">
                          Get OTP
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {tab == "otp" && (
        <>
          <div class="login-screen">
            <div class="frame-parent min-screen p-0 ">
              <div class="group-parent m-0">
                <div class="group ">
                  <div class="padding-inner pt-2">
                    <a
                      href="#"
                      class="back-button"
                      onClick={(e) => {
                        e.preventDefault();
                        settab("forgot-password");
                      }}
                    >
                      <img src="images/arrow-left.svg" />
                    </a>
                    <div class="text-center">
                      <img
                        class="img-fluid logo"
                        alt=""
                        src="images/logo.png"
                        width="145px"
                      />
                    </div>
                    <form
                      class="login_margin"
                      onSubmit={(e) => {
                        e.preventDefault();
                        verifyOtp();
                      }}
                    >
                      <h3 class="mb-3 mb-md-3 page-title">OTP Verification</h3>
                      <p class="text-left mb-3 mb-md-4">
                        Check your Email, We’ve sent you PIN at Your Email.
                      </p>
                      <div class="otp-field">
                        <div class="group-input">
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
                        <div class="group-input">
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
                        <div class="group-input">
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
                        <div class="group-input">
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
                      <div class="btn_gred mt-4">
                        <button type="submit" class="btn_admina">
                          Verify
                        </button>
                      </div>
                      <div class="text-center">
                        <p class="mt-3">Didn’t you recevie any code?</p>
                        <button
                          class="send_link"
                          onClick={() => {
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
      )}

      {tab == "change-password" && (
        <>
          <div class="login-screen">
            <div class="frame-parent min-screen p-0 ">
              <div class="group-parent m-0">
                <div class="group ">
                  <div class="padding-inner pt-2">
                    <a
                      href="#"
                      class="back-button"
                      onClick={(e) => {
                        e.preventDefault();
                        settab("otp");
                      }}
                    >
                      <img src="images/arrow-left.svg" />
                    </a>
                    <div class="text-center">
                      <img
                        class="img-fluid logo"
                        alt=""
                        src="images/logo.png"
                        width="145px"
                      />
                    </div>
                    <form
                      class="login_margin"
                      onSubmit={(e) => {
                        e.preventDefault();
                        passwordSubmit();
                      }}
                    >
                      <h3 class="mb-3 mb-md-3 page-title">
                        Create New Password
                      </h3>
                      <p class="text-left mb-3 mb-md-4">
                        Let’s Create New Password, And Start Your Sessions.
                      </p>
                      <div class="group-input">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Icons">
                            <g id="Group 105">
                              <path
                                id="Vector 23"
                                d="M12.0833 10.8333L16.1666 6.75M17.9166 5L16.1666 6.75M16.1666 6.75L19.0833 9.66667"
                                stroke="#363853"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <circle
                                id="Ellipse 23"
                                cx="8.58332"
                                cy="14.3334"
                                r="4.66667"
                                stroke="#363853"
                                stroke-width="1.5"
                              />
                            </g>
                          </g>
                        </svg>
                        <input
                          type={passwordShow.password ? "text" : "password"}
                          id="new_password"
                          name=""
                          required
                          placeholder="Enter your new password"
                          value={passwordChange.password}
                          onChange={(e) => {
                            setpasswordChange({
                              ...passwordChange,
                              password: e.target.value,
                            });
                          }}
                        />
                        <div
                          class="hide-show-icon"
                          onClick={() => {
                            setpasswordShow({
                              ...passwordShow,
                              password: !passwordShow.password,
                            });
                          }}
                        >
                          <img
                            src={
                              passwordShow.password
                                ? "images/hide.svg"
                                : "images/Icons=Eye.svg"
                            }
                          />
                        </div>
                      </div>
                      <div class="group-input">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Icons">
                            <g id="Group 105">
                              <path
                                id="Vector 23"
                                d="M12.0833 10.8333L16.1666 6.75M17.9166 5L16.1666 6.75M16.1666 6.75L19.0833 9.66667"
                                stroke="#363853"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <circle
                                id="Ellipse 23"
                                cx="8.58332"
                                cy="14.3334"
                                r="4.66667"
                                stroke="#363853"
                                stroke-width="1.5"
                              />
                            </g>
                          </g>
                        </svg>
                        <input
                          type={
                            passwordShow.confirm_password ? "text" : "password"
                          }
                          id="reenter_password"
                          name=""
                          required
                          placeholder="Re-Enter your new password"
                          value={passwordChange.confirm_password}
                          onChange={(e) => {
                            setpasswordChange({
                              ...passwordChange,
                              confirm_password: e.target.value,
                            });
                          }}
                        />
                        <div
                          class="hide-show-icon"
                          onClick={() => {
                            setpasswordShow({
                              ...passwordShow,
                              confirm_password: !passwordShow.confirm_password,
                            });
                          }}
                        >
                          <img
                            src={
                              passwordShow.confirm_password
                                ? "images/hide.svg"
                                : "images/Icons=Eye.svg"
                            }
                          />
                        </div>
                      </div>
                      {err?.password !== "" && (
                        <p className="text-danger ps-3">{err?.password}</p>
                      )}

                      <div class="btn_gred mt-4">
                        <button type="submit" class="btn_admina">
                          Confirm
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgetPassword;
