import React, { useState } from "react";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../action/authConstant";

const SignIn = () => {
  const rememberData = JSON.parse(localStorage.getItem("AdAnima_remember"));
  const [loginChange, setloginChange] = useState(
    rememberData
      ? rememberData
      : {
          email: "",
          password: "",
          remember: false,
        }
  );

  const [passwordShow, setpasswordShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ ...loginChange }));
    // try {
    //   await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.login}`, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email_address: loginChange.email,
    //       password: loginChange.password,
    //       device_token: "jbiusigerihsizdxjdjsi999",
    //       device_type: "web",
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       if (data.success) {
    //         localStorage.setItem("AdAnima_auth", JSON.stringify(data.data));
    //         if (loginChange.remember) {
    //           localStorage.setItem(
    //             "AdAnima_remember",
    //             JSON.stringify(loginChange)
    //           );
    //         }
    //         navigate("/");
    //         toast.success(data.message);
    //       } else {
    //         toast.error(data.message);
    //       }
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  };
  const loader = useSelector((state) => state.loader);

  return (
    <>
      <div
        class="tab-pane fade show active"
        id="login"
        role="tabpanel"
        aria-labelledby="login-tab"
      >
        <h3 class="mb-3 mb-md-4">Welcome, Sign in</h3>
        <form onSubmit={login}>
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
              placeholder="Email Address"
              required
              value={loginChange.email}
              onChange={(e) => {
                setloginChange({ ...loginChange, email: e.target.value });
              }}
            />
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
              type={passwordShow ? "text" : "password"}
              value={loginChange.password}
              required
              onChange={(e) => {
                setloginChange({ ...loginChange, password: e.target.value });
              }}
              placeholder="Password"
            />
            <div
              class="hide-show-icon"
              onClick={() => {
                setpasswordShow(!passwordShow);
              }}
            >
              <img
                src={
                  passwordShow
                    ? "images/hide.svg"
                    : "images/Icons=Eye.svg"
                }
              />
            </div>
          </div>
          <div class="" style={{ overflow: "hidden" }}>
            <div class="group-input-check mt-3 mt-sm-4 float-none float-sm-start">
              <label class="gred-checkbox">
                Remember me
                <input
                  type="checkbox"
                  checked={loginChange.remember}
                  onChange={(e) => {
                    setloginChange({
                      ...loginChange,
                      remember: e.target.checked,
                    });
                  }}
                />
                <span class="checkmark"></span>
              </label>
            </div>
            <div class="float-none float-sm-end mt-3 mt-sm-4">
              <Link to={"/forgot_password"} class="login-link">
                Forgot Password?
              </Link>
            </div>
          </div>

          <div class="btn_gred">
            {loader ? (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                class="btn_admina "
              >
                {/* save */}
                <div class="loader"></div>
              </a>
            ) : (
              <button type="submit" class="btn_admina ">
                Log In
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
