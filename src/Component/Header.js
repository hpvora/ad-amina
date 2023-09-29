import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import EditProfile from "./EditProfile";
import { deleteUser, logoutUser } from "../action/authConstant";
import { useDispatch, useSelector } from "react-redux";
import { loaderConstant } from "../action/constant";
import { getUserDetails } from "../action/UserConstant";
import LogOutPopUp from "./LogOutPopUp";
import { Drawer } from "antd";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/images/logo-2.png";
import NotiIcon from "../assets/images/noti.svg";
import ProfileIcon from "../assets/images/profile.svg";
import PaswordIcon from "../assets/images/password.svg";
import DeleAccIcon from "../assets/images/deleteAccIcon.svg";
import LogOutIcon from "../assets/images/logout.svg";
import Pr2 from "../assets/images/pr-2.jpg";
import EditIcon from "../assets/images/edit.svg";
import MImgIcon from "../assets/images/m-img.jpg";
import PlusIcon from "../assets/images/plus.png";
import Logo2 from "../assets/images/logo.png";
import HideIcon from "../assets/images/hide.svg";
import EyeIcon from "../assets/images/Icons=Eye.svg";

const OPTIONS = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Bookings",
    route: "/booking",
  },
  {
    name: "My Events",
    route: "/my_events",
  },
  {
    name: "My Page",
    route: "/my_page",
  },
  {
    name: "My Schedule",
    route: "/my_schedule",
  },
  {
    name: "Save",
    route: "/save",
  },
];

const Header = () => {
  const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!userAuth?.token) {
      navigate("/login");
    }
    dispatch(getUserDetails(userAuth?._id));
  }, []);

  const location = useLocation();

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const deleteAccount = () => {
    dispatch(deleteUser());
  };

  const [passwordShow, setpasswordShow] = useState({
    old_password: false,
    password: false,
    confirm_password: false,
  });

  const [passwordChange, setpasswordChange] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });

  const [err, seterr] = useState({
    password: "",
  });

  const [passswordModal, setpassswordModal] = useState(false);

  const [editModal, seteditModal] = useState(false);

  const userDetails = useSelector((state) => state.user);

  const loader = useSelector((state) => state.loader);

  const passwordSubmit = async (e) => {
    e.preventDefault();
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
      dispatch({
        type: loaderConstant.LOADER,
        payload: true,
      });
      const fdata = new FormData();
      fdata.append("old_password", passwordChange.old_password);
      fdata.append("new_password", passwordChange.password);
      await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.change_password}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userAuth.token}`,
        },
        body: fdata,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
            setpassswordModal(false);
            setpasswordChange({
              old_password: "",
              password: "",
              confirm_password: "",
            });
          } else {
            toast.error(data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch({
        type: loaderConstant.LOADER,
        payload: false,
      });
    }
  };

  const [logoutModal, setlogoutModal] = useState({
    mode: "",
    modalOpen: false,
  });

  const confirmDelete = () => {
    if (logoutModal.mode === "logout") {
      logout();
    } else {
      deleteAccount();
    }
  };

  const [drowerOpen, setdrowerOpen] = useState(false);

  return (
    <>
      <header>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="ps-0">
              <Link to={"/"}>
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <ul className="mb-0 header-menu d-none d-xl-flex">
                  {OPTIONS.map((opt, i) => (
                    <React.Fragment key={i}>
                      <li
                        className={
                          opt.route == location.pathname ? "active" : ""
                        }
                        onClick={() => navigate(opt.route)}
                      >
                        {opt.name}
                      </li>
                    </React.Fragment>
                  ))}
                  {/*<li className="active">Home</li>*/}
                  {/*<li>Bookings</li>*/}
                  {/*<li>My Events</li>*/}
                  {/*<li onClick={() => navigate("/my-pages")}>My Page</li>*/}
                  {/*<li>My Schedule</li>*/}
                  {/*<li>Save</li>*/}
                </ul>
              </div>
              <div className="me-3">
                <img src={NotiIcon} alt="logo" />
              </div>

              <div className="profile d-flex align-items-center">
                <Link to={"/profile"} className="d-flex align-items-center">
                  <img
                    src={userDetails?.profile_picture}
                    className="rounded-circle me-2 me-sm-3 pr-img"
                    style={{
                      height: "66px",
                      width: "66px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />

                  <div>
                    <h4>{userDetails?.name}</h4>
                    <p className="mb-0">
                      {userDetails?.user_type == "provider"
                        ? "Provider"
                        : "User"}
                    </p>
                  </div>
                </Link>
                <div className="dropdown ms-2 ms-md-3 ms-lg-5 action-btn">
                  <button
                    className=""
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group 21861">
                        <path
                          id="Shape"
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#585858"
                          strokeWidth="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <span
                        className="dropdown-item"
                        onClick={() => {
                          seteditModal(true);
                        }}
                      >
                        <img src={ProfileIcon} />
                        Edit Profile
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item"
                        onClick={() => {
                          setpassswordModal(true);
                        }}
                      >
                        <img src={PaswordIcon} />
                        Change Password
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item t-red"
                        onClick={() => {
                          setlogoutModal({ modalOpen: true, mode: "delete" });
                        }}
                      >
                        <img src={DeleAccIcon} />
                        Delete Account
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item t-red"
                        onClick={() => {
                          setlogoutModal({ modalOpen: true, mode: "logout" });
                        }}
                      >
                        <img src={LogOutIcon} />
                        Log Out
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="d-block d-xl-none ms-2"
                onClick={() => setdrowerOpen(true)}
              >
                <MenuIcon />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="modal fade"
        id="edit_profile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <button
              type="button"
              className="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="25" cy="25" r="25" fill="#EEEEEE" />
                <path
                  d="M25 38.4375C17.5875 38.4375 11.5625 32.4125 11.5625 25C11.5625 17.5875 17.5875 11.5625 25 11.5625C32.4125 11.5625 38.4375 17.5875 38.4375 25C38.4375 32.4125 32.4125 38.4375 25 38.4375ZM25 13.4375C18.625 13.4375 13.4375 18.625 13.4375 25C13.4375 31.375 18.625 36.5625 25 36.5625C31.375 36.5625 36.5625 31.375 36.5625 25C36.5625 18.625 31.375 13.4375 25 13.4375Z"
                  fill="#363853"
                />
                <path
                  d="M21.4627 29.4752C21.2252 29.4752 20.9877 29.3877 20.8002 29.2002C20.4377 28.8377 20.4377 28.2377 20.8002 27.8752L27.8752 20.8002C28.2377 20.4377 28.8377 20.4377 29.2002 20.8002C29.5627 21.1627 29.5627 21.7627 29.2002 22.1252L22.1252 29.2002C21.9502 29.3877 21.7002 29.4752 21.4627 29.4752Z"
                  fill="#363853"
                />
                <path
                  d="M28.5377 29.4752C28.3002 29.4752 28.0627 29.3877 27.8752 29.2002L20.8002 22.1252C20.4377 21.7627 20.4377 21.1627 20.8002 20.8002C21.1627 20.4377 21.7627 20.4377 22.1252 20.8002L29.2002 27.8752C29.5627 28.2377 29.5627 28.8377 29.2002 29.2002C29.0127 29.3877 28.7752 29.4752 28.5377 29.4752Z"
                  fill="#363853"
                />
              </svg>
            </button>

            <form>
              <div className="text-center mb-3 mb-md-5">
                <div className="upadte_profile">
                  <img src={Pr2} className="pr-second" />
                  <div className="edit-btn">
                    <input type="file" name="" />
                    <span className="icon">
                      <img src={EditIcon} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="group-input ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.25 6C15.25 7.79493 13.7949 9.25 12 9.25V10.75C14.6234 10.75 16.75 8.62335 16.75 6H15.25ZM12 9.25C10.2051 9.25 8.75 7.79493 8.75 6H7.25C7.25 8.62335 9.37665 10.75 12 10.75V9.25ZM8.75 6C8.75 4.20507 10.2051 2.75 12 2.75V1.25C9.37665 1.25 7.25 3.37665 7.25 6H8.75ZM12 2.75C13.7949 2.75 15.25 4.20507 15.25 6H16.75C16.75 3.37665 14.6234 1.25 12 1.25V2.75ZM9 13.75H15V12.25H9V13.75ZM15 20.25H9V21.75H15V20.25ZM9 20.25C7.20507 20.25 5.75 18.7949 5.75 17H4.25C4.25 19.6234 6.37665 21.75 9 21.75V20.25ZM18.25 17C18.25 18.7949 16.7949 20.25 15 20.25V21.75C17.6234 21.75 19.75 19.6234 19.75 17H18.25ZM15 13.75C16.7949 13.75 18.25 15.2051 18.25 17H19.75C19.75 14.3766 17.6234 12.25 15 12.25V13.75ZM9 12.25C6.37665 12.25 4.25 14.3766 4.25 17H5.75C5.75 15.2051 7.20507 13.75 9 13.75V12.25Z"
                    fill="#363853"
                  />
                </svg>
                <input type="text" name="" placeholder="Full Name" />
              </div>
              <div className="group-input">
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
                      strokeWidth="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      id="Vector_2"
                      d="M21.1146 15.1512C21.6285 13.0819 21.6285 10.9182 21.1146 8.84875C20.442 6.13984 18.294 4.04534 15.5694 3.44162L15.1156 3.34105C13.0634 2.88632 10.9366 2.88632 8.88443 3.34105L8.43056 3.44162C5.70602 4.04534 3.55805 6.13983 2.88539 8.84875C2.37154 10.9181 2.37154 13.0819 2.88539 15.1513C3.55805 17.8602 5.70601 19.9547 8.43056 20.5584L8.88443 20.659"
                      stroke="#363853"
                      strokeWidth="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      id="Vector_3"
                      d="M8.15112 10.3501L10.7216 12.1866C11.4864 12.7329 12.5136 12.7329 13.2783 12.1866L15.8489 10.3501"
                      stroke="#363853"
                      strokeWidth="1.5"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
                <input type="email" name="" placeholder="Email Address" />
              </div>
              <div className="group-input">
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
                      strokeWidth="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      id="Vector_2"
                      d="M21.1146 15.1512C21.6285 13.0819 21.6285 10.9182 21.1146 8.84875C20.442 6.13984 18.294 4.04534 15.5694 3.44162L15.1156 3.34105C13.0634 2.88632 10.9366 2.88632 8.88443 3.34105L8.43056 3.44162C5.70602 4.04534 3.55805 6.13983 2.88539 8.84875C2.37154 10.9181 2.37154 13.0819 2.88539 15.1513C3.55805 17.8602 5.70601 19.9547 8.43056 20.5584L8.88443 20.659"
                      stroke="#363853"
                      strokeWidth="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      id="Vector_3"
                      d="M8.15112 10.3501L10.7216 12.1866C11.4864 12.7329 12.5136 12.7329 13.2783 12.1866L15.8489 10.3501"
                      stroke="#363853"
                      strokeWidth="1.5"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
                <input type="number" name="" placeholder="Phone Number" />
              </div>
              <div className="group-input">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Hicon / Linear / Calender 3">
                    <g id="Calender 2">
                      <path
                        id="Vector"
                        d="M5.06107 21.0451L5.50191 20.4383L5.06107 21.0451ZM3.95491 19.9389L4.56168 19.4981L3.95491 19.9389ZM20.0451 19.9389L19.4383 19.4981L20.0451 19.9389ZM18.9389 21.0451L19.3798 21.6518L18.9389 21.0451ZM18.9389 4.95492L19.3798 4.34815L18.9389 4.95492ZM20.0451 6.06107L19.4383 6.50191L20.0451 6.06107ZM5.06107 4.95492L5.50191 5.56168H5.50191L5.06107 4.95492ZM3.95491 6.06107L4.56168 6.50191L3.95491 6.06107ZM19.2178 16.0616L19.1005 15.3208H19.1005L19.2178 16.0616ZM15.0616 20.2178L14.3208 20.1005V20.1005L15.0616 20.2178ZM14.25 5C14.25 5.41421 14.5858 5.75 15 5.75C15.4142 5.75 15.75 5.41421 15.75 5H14.25ZM15.75 2C15.75 1.58579 15.4142 1.25 15 1.25C14.5858 1.25 14.25 1.58579 14.25 2H15.75ZM8.25 5C8.25 5.41421 8.58579 5.75 9 5.75C9.41421 5.75 9.75 5.41421 9.75 5H8.25ZM9.75 2C9.75 1.58579 9.41421 1.25 9 1.25C8.58579 1.25 8.25 1.58579 8.25 2H9.75ZM20.9711 16L21.7206 16.0257L20.9711 16ZM15 21.9711L15.0257 22.7206L15 21.9711ZM12 21.25C10.1084 21.25 8.74999 21.249 7.69804 21.135C6.66013 21.0225 6.00992 20.8074 5.50191 20.4383L4.62023 21.6518C5.42656 22.2377 6.37094 22.5 7.53648 22.6263C8.68798 22.751 10.1418 22.75 12 22.75V21.25ZM2.25 13C2.25 14.8582 2.24897 16.312 2.37373 17.4635C2.50001 18.6291 2.76232 19.5734 3.34815 20.3798L4.56168 19.4981C4.19259 18.9901 3.97745 18.3399 3.865 17.302C3.75103 16.25 3.75 14.8916 3.75 13H2.25ZM5.50191 20.4383C5.14111 20.1762 4.82382 19.8589 4.56168 19.4981L3.34815 20.3798C3.70281 20.8679 4.13209 21.2972 4.62023 21.6518L5.50191 20.4383ZM19.4383 19.4981C19.1762 19.8589 18.8589 20.1762 18.4981 20.4383L19.3798 21.6518C19.8679 21.2972 20.2972 20.8679 20.6518 20.3798L19.4383 19.4981ZM21.75 13C21.75 11.1418 21.751 9.68798 21.6263 8.53648C21.5 7.37094 21.2377 6.42656 20.6518 5.62023L19.4383 6.50191C19.8074 7.00992 20.0225 7.66013 20.135 8.69804C20.249 9.74999 20.25 11.1084 20.25 13H21.75ZM18.4981 5.56168C18.8589 5.82382 19.1762 6.14111 19.4383 6.50191L20.6518 5.62023C20.2972 5.13209 19.8679 4.70281 19.3798 4.34815L18.4981 5.56168ZM3.75 13C3.75 11.1084 3.75103 9.74999 3.865 8.69804C3.97745 7.66013 4.19259 7.00992 4.56168 6.50191L3.34815 5.62023C2.76232 6.42656 2.50001 7.37094 2.37373 8.53648C2.24897 9.68798 2.25 11.1418 2.25 13H3.75ZM4.62023 4.34815C4.13209 4.70281 3.70281 5.13209 3.34815 5.62023L4.56168 6.50191C4.82382 6.14111 5.14111 5.82382 5.50191 5.56168L4.62023 4.34815ZM19.1005 15.3208C16.6401 15.7105 14.7105 17.6401 14.3208 20.1005L15.8023 20.3352C16.0904 18.5166 17.5166 17.0904 19.3352 16.8023L19.1005 15.3208ZM9.75 5V4.02893H8.25V5H9.75ZM9.75 4.02893V2H8.25V4.02893H9.75ZM12 3.25C10.8352 3.25 9.83424 3.24991 8.97432 3.27937L9.02568 4.77849C9.85445 4.75009 10.8269 4.75 12 4.75V3.25ZM8.97432 3.27937C7.10087 3.34356 5.7239 3.5463 4.62023 4.34815L5.50191 5.56168C6.20746 5.04907 7.17075 4.84204 9.02568 4.77849L8.97432 3.27937ZM15.75 5V4.02893H14.25V5H15.75ZM15.75 4.02893V2H14.25V4.02893H15.75ZM12 4.75C13.1731 4.75 14.1456 4.75009 14.9743 4.77849L15.0257 3.27937C14.1658 3.24991 13.1648 3.25 12 3.25V4.75ZM14.9743 4.77849C16.8292 4.84204 17.7925 5.04907 18.4981 5.56168L19.3798 4.34815C18.2761 3.5463 16.8991 3.34356 15.0257 3.27937L14.9743 4.77849ZM20.9711 15.25C20.0888 15.25 19.5579 15.2484 19.1005 15.3208L19.3352 16.8023C19.647 16.7529 20.0338 16.75 20.9711 16.75L20.9711 15.25ZM20.25 13C20.25 14.1731 20.2499 15.1456 20.2215 15.9743L21.7206 16.0257C21.7501 15.1658 21.75 14.1648 21.75 13H20.25ZM20.2215 15.9743C20.158 17.8292 19.9509 18.7925 19.4383 19.4981L20.6518 20.3798C21.4537 19.2761 21.6564 17.8991 21.7206 16.0257L20.2215 15.9743ZM15.75 21.9711C15.75 21.0338 15.7529 20.647 15.8023 20.3352L14.3208 20.1005C14.2484 20.5579 14.25 21.0888 14.25 21.9711L15.75 21.9711ZM12 22.75C13.1648 22.75 14.1658 22.7501 15.0257 22.7206L14.9743 21.2215C14.1456 21.2499 13.1731 21.25 12 21.25V22.75ZM15.0257 22.7206C16.8991 22.6564 18.2761 22.4537 19.3798 21.6518L18.4981 20.4383C17.7925 20.9509 16.8292 21.158 14.9743 21.2215L15.0257 22.7206Z"
                        fill="#363853"
                      />
                      <g id="Vector_2">
                        <path
                          d="M8 9C8 9.55228 7.55228 10 7 10C6.44772 10 6 9.55228 6 9C6 8.44772 6.44772 8 7 8C7.55228 8 8 8.44772 8 9Z"
                          fill="#363853"
                        />
                        <path
                          d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                          fill="#363853"
                        />
                        <path
                          d="M13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                          fill="#363853"
                        />
                        <path
                          d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                          fill="#363853"
                        />
                        <path
                          d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                          fill="#363853"
                        />
                        <path
                          d="M18 9C18 9.55228 17.5523 10 17 10C16.4477 10 16 9.55228 16 9C16 8.44772 16.4477 8 17 8C17.5523 8 18 8.44772 18 9Z"
                          fill="#363853"
                        />
                        <path
                          d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                          fill="#363853"
                        />
                        <path
                          d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                          fill="#363853"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <input type="date" name="" placeholder="MM/DD/YYYY" />
              </div>
              <div className="mt-4">
                <h4 className="input-label">
                  Tell us more about you how would you like to be introduced?
                </h4>
                <textarea
                  type="text"
                  placeholder=""
                  className="dashed-border"
                ></textarea>
              </div>
              <div className="mt-4">
                <h4 className="input-label float-start">
                  do you have a website?, or more links?
                </h4>
                <span className="plus-icon float-end">
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
                <div className="group-input mt-2 p-15 clearfix">
                  <input type="text" name="" placeholder="Your Link here" />
                </div>
              </div>

              <div className="mt-4">
                <h4 className="input-label">Upload Services Pictures.</h4>
                <div className="multi_imgs mt-3">
                  <div className="hexagone">
                    <span className="remove">
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
                    <img src={MImgIcon} />
                  </div>
                  <div className="hexagone">
                    <span className="remove">
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
                    <img src={MImgIcon} />
                  </div>
                  <div className="hexagone">
                    <span className="remove">
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
                    <img src={MImgIcon} />
                  </div>
                  <div className="hexagone">
                    <span className="remove">
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
                    <img src={MImgIcon} />
                  </div>
                  <div className="d-inline-block">
                    <div className="custom-upload-2">
                      <input type="file" name="" />
                      <img src={PlusIcon} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="btn_gred mt-4">
                <button className="btn_admina ">save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Drawer
        title=""
        placement="right"
        onClose={() => {
          setdrowerOpen(false);
        }}
        open={drowerOpen}
      >
        <ul className="mb-0 header-menu">
          {OPTIONS.map((opt, i) => (
            <li className="m-0 my-4" onClick={() => navigate(opt.route)}>
              {opt.name}
            </li>
          ))}
          {/*<li className="active m-0 my-4" onClick={() => navigate("/")}>Home</li>*/}
          {/*<li className="m-0 my-4">Bookings</li>*/}
          {/*<li className="m-0 my-4">My Events</li>*/}
          {/*<li className="m-0 my-4" onClick={() => navigate("/my-pages")}>My Page</li>*/}
          {/*<li className="m-0 my-4">My Schedule</li>*/}
          {/*<li className="m-0 my-4">Save</li>*/}
        </ul>
      </Drawer>

      <EditProfile editModal={editModal} seteditModal={seteditModal} />

      <Modal
        centered
        show={passswordModal}
        onHide={() => {
          setpassswordModal(false);
          setpasswordChange({
            old_password: "",
            password: "",
            confirm_password: "",
          });
        }}
      >
        <button
          type="button"
          className="close-modal"
          onClick={() => {
            setpassswordModal(false);
            setpasswordChange({
              old_password: "",
              password: "",
              confirm_password: "",
            });
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#EEEEEE" />
            <path
              d="M25 38.4375C17.5875 38.4375 11.5625 32.4125 11.5625 25C11.5625 17.5875 17.5875 11.5625 25 11.5625C32.4125 11.5625 38.4375 17.5875 38.4375 25C38.4375 32.4125 32.4125 38.4375 25 38.4375ZM25 13.4375C18.625 13.4375 13.4375 18.625 13.4375 25C13.4375 31.375 18.625 36.5625 25 36.5625C31.375 36.5625 36.5625 31.375 36.5625 25C36.5625 18.625 31.375 13.4375 25 13.4375Z"
              fill="#363853"
            />
            <path
              d="M21.4627 29.4752C21.2252 29.4752 20.9877 29.3877 20.8002 29.2002C20.4377 28.8377 20.4377 28.2377 20.8002 27.8752L27.8752 20.8002C28.2377 20.4377 28.8377 20.4377 29.2002 20.8002C29.5627 21.1627 29.5627 21.7627 29.2002 22.1252L22.1252 29.2002C21.9502 29.3877 21.7002 29.4752 21.4627 29.4752Z"
              fill="#363853"
            />
            <path
              d="M28.5377 29.4752C28.3002 29.4752 28.0627 29.3877 27.8752 29.2002L20.8002 22.1252C20.4377 21.7627 20.4377 21.1627 20.8002 20.8002C21.1627 20.4377 21.7627 20.4377 22.1252 20.8002L29.2002 27.8752C29.5627 28.2377 29.5627 28.8377 29.2002 29.2002C29.0127 29.3877 28.7752 29.4752 28.5377 29.4752Z"
              fill="#363853"
            />
          </svg>
        </button>
        <div className="text-center">
          <img className="img-fluid logo" alt="" src={Logo2} width="145px" />
        </div>
        <form className="login_margin" onSubmit={(e) => passwordSubmit(e)}>
          <h3 className="mb-3 mb-md-3 page-title">Set New Password</h3>
          <p className="text-left mb-3 mb-md-4">
            Enter your old password, and set your new Password.
          </p>
          <div className="group-input">
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
                    strokeWidth="1.5"
                    stroke-linecap="round"
                  />
                  <circle
                    id="Ellipse 23"
                    cx="8.58332"
                    cy="14.3334"
                    r="4.66667"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                </g>
              </g>
            </svg>
            <input
              type={passwordShow.old_password ? "text" : "password"}
              id="new_password"
              required
              name=""
              value={passwordChange.old_password}
              onChange={(e) => {
                setpasswordChange({
                  ...passwordChange,
                  old_password: e.target.value,
                });
              }}
              placeholder="Enter your old password"
            />
            <div
              className="hide-show-icon"
              onClick={() => {
                setpasswordShow({
                  ...passwordShow,
                  old_password: !passwordShow.old_password,
                });
              }}
            >
              <img src={passwordShow.old_password ? HideIcon : EyeIcon} />
            </div>
          </div>
          <div className="group-input">
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
                    strokeWidth="1.5"
                    stroke-linecap="round"
                  />
                  <circle
                    id="Ellipse 23"
                    cx="8.58332"
                    cy="14.3334"
                    r="4.66667"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                </g>
              </g>
            </svg>
            <input
              type={passwordShow.password ? "text" : "password"}
              id="reenter_password"
              required
              name=""
              value={passwordChange.password}
              onChange={(e) => {
                setpasswordChange({
                  ...passwordChange,
                  password: e.target.value,
                });
              }}
              placeholder="Enter your new password"
            />
            <div
              className="hide-show-icon"
              onClick={() => {
                setpasswordShow({
                  ...passwordShow,
                  password: !passwordShow.password,
                });
              }}
            >
              <img src={passwordShow.password ? HideIcon : EyeIcon} />
            </div>
          </div>
          <div className="group-input">
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
                    strokeWidth="1.5"
                    stroke-linecap="round"
                  />
                  <circle
                    id="Ellipse 23"
                    cx="8.58332"
                    cy="14.3334"
                    r="4.66667"
                    stroke="#363853"
                    strokeWidth="1.5"
                  />
                </g>
              </g>
            </svg>
            <input
              type={passwordShow.confirm_password ? "text" : "password"}
              id="reenter_password"
              required
              name=""
              value={passwordChange.confirm_password}
              onChange={(e) => {
                setpasswordChange({
                  ...passwordChange,
                  confirm_password: e.target.value,
                });
              }}
              placeholder="Re-Enter your new password"
            />
            <div
              className="hide-show-icon"
              onClick={() => {
                setpasswordShow({
                  ...passwordShow,
                  confirm_password: !passwordShow.confirm_password,
                });
              }}
            >
              <img src={passwordShow.confirm_password ? HideIcon : EyeIcon} />
            </div>
          </div>
          {err?.password !== "" && (
            <p className="text-danger ps-3">{err?.password}</p>
          )}
          <div className="btn_gred mt-4">
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
                Confirm
              </button>
            )}
          </div>
        </form>
      </Modal>
      <LogOutPopUp
        logOutData={logoutModal}
        setlogOutData={setlogoutModal}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Header;
