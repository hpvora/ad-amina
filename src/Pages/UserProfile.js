import React, { useEffect, useState } from "react";
import { APP_VERSION, BASE_URL, URL_PATH } from "../Configration/configration";
import { userAuth } from "../App";
import { toast } from "react-toastify";
import Header from "../Component/Header";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import { getUserDetails } from "../action/UserConstant";
import { useDispatch, useSelector } from "react-redux";
import { usePlacesWidget } from "react-google-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { loaderConstant } from "../action/constant";

const UserProfile = () => {
  const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));

  const [serviceList, setserviceList] = useState([]);

  const [serviceData, setserviceData] = useState([]);

  const [serviceIdList, setserviceIdList] = useState([]);

  const [modelShow, setmodelShow] = useState(false);

  const [userService, setuserService] = useState();

  const getservice = async () => {
    const fdata = new FormData();
    fdata.append("user_id", userAuth._id);

    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.get_user_service}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      },
      body: fdata,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setuserService(data.data);
          console.log(data.data);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [loader, setloader] = useState(true);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user);

  const [aiImage, setaiImage] = useState([]);

  const getImageUsingAi = async () => {
    const newservice = userDetails?.provider_services?.map((data) => {
      return data.description_name;
    });

    await fetch(`https://api.openai.com/v1/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        prompt: newservice?.join(", "),
        n: 1,
        size: "512x512",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buttonLoader = useSelector((state) => state.loader);

  useEffect(() => {
    if (userDetails?.user_type == "provider") {
      getImageUsingAi();
      setloader(false);
    }

    if (userDetails?.user_type == "user") {
      setloader(false);
    }
  }, [userDetails]);

  useEffect(() => {
    if (userAuth?._id) {
      dispatch(getUserDetails(userAuth?._id));
      getservice();
    }
  }, []);

  const [serviceForm, setserviceForm] = useState({
    service: "",
    details: "in_person",
    details_link: "",
    location: "i_travel",
    locationCordinates: "",
    adress: "",
    time: "",
    session_price: "",
    member: "",
    meximum_member: "",
    addition_price: "",
    discription: "",
    session_hours: "0",
    session_minutes: "0",
  });

  const serviceAdd = async () => {
    dispatch({
      type: loaderConstant.LOADER,
      payload: true,
    });
    const fdata = new FormData();
    fdata.append("user_id", userAuth._id);
    fdata.append("service_name", serviceForm.service);
    fdata.append("service_type", serviceForm.details);
    fdata.append("location_type", serviceForm.location);
    if (serviceForm.adress !== "") {
      fdata.append("address", serviceForm.adress);
    }

    if (serviceForm.locationCordinates !== "") {
      fdata.append("location", JSON.stringify(serviceForm.locationCordinates));
    }

    if (serviceForm.details_link !== "") {
      fdata.append("session_link", serviceForm.details_link);
    }
    fdata.append("session_price", serviceForm.session_price);
    fdata.append("participants", serviceForm.member);
    fdata.append("additional_price", serviceForm.addition_price);
    fdata.append("maximum_participants", serviceForm.meximum_member);
    fdata.append("description", serviceForm.discription);
    fdata.append("session_hour", serviceForm.session_hours);
    fdata.append("session_minute", serviceForm.session_minutes);

    await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.add_services}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      },
      body: fdata,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setmodelShow(false);
          setserviceForm({
            service: "",
            details: "in_person",
            details_link: "",
            location: "i_travel",
            adress: "",
            time: "",
            session_price: "",
            member: "",
            meximum_member: "",
            addition_price: "",
            discription: "",
            session_hours: '0',
            session_minutes: '0',
          });
          getservice();
          toast.success(data?.message);
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
  };

  return (
    <>
      {loader && (
        <>
          <div className="preloader">
            <svg
              className="loader-svg"
              width="150"
              height="150"
              viewBox="-0.1 -0.1 1.2 1.2"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#00bc9b" />
                  <stop offset="100%" stop-color="#EFCE96 " />
                </linearGradient>
              </defs>
              <path
                className="hexagon background"
                d="M0.4625 0.01165063509
      a0.075 0.075 0 0 1 0.075 0
      l0.3666729559 0.2116987298
      a0.075 0.075 0 0 1 0.0375 0.06495190528
      l0 0.4233974596
      a0.075 0.075 0 0 1 -0.0375 0.06495190528
      l-0.3666729559 0.2116987298
      a0.075 0.075 0 0 1 -0.075 0
      l-0.3666729559 -0.2116987298
      a0.075 0.075 0 0 1 -0.0375 -0.06495190528
      l0 -0.4233974596
      a0.075 0.075 0 0 1 0.0375 -0.06495190528 Z"
                stroke="url(#gradient)"
              />
              <path
                id="trace"
                className="hexagon trace"
                d="M0.4625 0.01165063509
      a0.075 0.075 0 0 1 0.075 0
      l0.3666729559 0.2116987298
      a0.075 0.075 0 0 1 0.0375 0.06495190528
      l0 0.4233974596
      a0.075 0.075 0 0 1 -0.0375 0.06495190528
      l-0.3666729559 0.2116987298
      a0.075 0.075 0 0 1 -0.075 0
      l-0.3666729559 -0.2116987298
      a0.075 0.075 0 0 1 -0.0375 -0.06495190528
      l0 -0.4233974596
      a0.075 0.075 0 0 1 0.0375 -0.06495190528 Z"
              />
            </svg>
          </div>
        </>
      )}

      <section className="main-page">
        <Header />

        {userDetails?.user_type == "user" ? (
          <>
            <div className="main-inner">
              <div className="container">
                <h1 className="d-inline-block">WELCOME ABOARD!</h1>
                <p className="para mb-3 mb-lg-5">
                  Thank you for joining us early. Check your email for a special
                  reward. Get ready for an exciting journey!
                </p>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="border-gred ">
                      <div className="inner-gred d-flex align-items-center pading_user">
                        <div className="p_image_shape me-2 me-sm-3">
                          <img src={`${userDetails?.profile_picture}`} />
                        </div>
                        <div>
                          <h4 className="mb-1">{userDetails?.name}</h4>
                          {userDetails?.is_ambassador && (
                            <img
                              src="/images/ambassador.svg"
                              className="mb-1"
                              style={{ height: "20px", marginLeft: "-5px" }}
                            />
                          )}
                          <p className="mb-0">User</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 ">
                    <div className="border-gred">
                      <div className="inner-gred">
                        <ul>
                          <li>
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
                            {userDetails?.email_address}
                          </li>
                          <li>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Iconly/Curved/Call">
                                <g id="Call">
                                  <path
                                    id="Stroke 1"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8.20049 15.799C1.3025 8.90022 2.28338 5.74115 3.01055 4.72316C3.10396 4.55862 5.40647 1.11188 7.87459 3.13407C14.0008 8.17945 6.2451 7.46611 11.3894 12.6113C16.5348 17.7554 15.8214 9.99995 20.8659 16.1249C22.8882 18.594 19.4413 20.8964 19.2778 20.9888C18.2598 21.717 15.0995 22.6978 8.20049 15.799Z"
                                    stroke="#363853"
                                    strokeWidth="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </g>
                              </g>
                            </svg>
                            {userDetails?.mobile_number !== "" &&
                            userDetails?.mobile_number !== null ? (
                              <>
                                <span className="me-2">
                                  {userDetails?.country_code}
                                </span>
                                {userDetails?.mobile_number}
                              </>
                            ) : (
                              "-"
                            )}
                          </li>
                          <li className="mb-0">
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
                                  ></path>
                                  <g id="Vector_2">
                                    <path
                                      d="M8 9C8 9.55228 7.55228 10 7 10C6.44772 10 6 9.55228 6 9C6 8.44772 6.44772 8 7 8C7.55228 8 8 8.44772 8 9Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M18 9C18 9.55228 17.5523 10 17 10C16.4477 10 16 9.55228 16 9C16 8.44772 16.4477 8 17 8C17.5523 8 18 8.44772 18 9Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                                      fill="#363853"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </svg>
                            {userDetails?.dob !== "" &&
                            userDetails?.dob !== null ? (
                              <span className="me-2">
                                {moment(userDetails?.dob?.split("T")[0]).format(
                                  "D MMM, YYYY"
                                )}
                              </span>
                            ) : (
                              "-"
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="note text-center mt-3 mt-md-5">
                The platform will be ready soon
              </p>
            </div>
          </>
        ) : (
          <>
            {/* provider detail */}
            <div className="main-inner">
              <div className="container">
                <h1 className="d-inline-block">WELCOME!</h1>
                <p className="para mb-3 mb-lg-5">
                  Your profile is under review. Joining us early presents a
                  valuable opportunity for faster verification. Once our network
                  is live, we’ll notify you. Get ready for an exciting journey
                  ahead!
                </p>
                <div className="row">
                  <div className="col-12 col-lg-6 col-xl-6">
                    <div className="border-gred">
                      <div className="inner-gred d-flex ">
                        <div className="p_image_shape me-2 me-sm-3">
                          {userDetails?.is_verified && (
                            <>
                              <img
                                src="images/check.svg"
                                className="blue_check"
                              />
                            </>
                          )}

                          <img src={userDetails?.profile_picture} />
                        </div>
                        <div>
                          <h4 className="mb-1">{userDetails?.name}</h4>
                          {userDetails?.is_ambassador && (
                            <img
                              src="/images/ambassador.svg"
                              className="mb-1"
                              style={{ height: "20px", marginLeft: "-5px" }}
                            />
                          )}
                          <p className="mb-1">Provider</p>
                          <div className="selected_services">
                            {userDetails?.provider_services.map((data) => {
                              return (
                                <>
                                  {data?.description_name == "Other" ? (
                                    <>
                                      <span>{userDetails?.other_desc}</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>{data?.description_name}</span>
                                    </>
                                  )}
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-gred">
                      <div className="inner-gred">
                        <ul>
                          <li>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.88539 8.84875C3.55805 6.13983 5.70602 4.04534 8.43056 3.44162L8.88443 3.34105C10.9366 2.88632 13.0634 2.88632 15.1156 3.34105L15.5694 3.44162C18.294 4.04534 20.442 6.13984 21.1146 8.84875C21.6285 10.9182 21.6285 13.0819 21.1146 15.1512C20.442 17.8602 18.294 19.9547 15.5694 20.5584L15.1156 20.659C13.0634 21.1137 10.9366 21.1137 8.88443 20.659L8.43056 20.5584C5.70601 19.9547 3.55805 17.8602 2.88539 15.1513C2.37154 13.0819 2.37154 10.9181 2.88539 8.84875Z"
                                stroke="#363853"
                                strokeWidth="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M21.1146 15.1512C21.6285 13.0819 21.6285 10.9182 21.1146 8.84875C20.442 6.13984 18.294 4.04534 15.5694 3.44162L15.1156 3.34105C13.0634 2.88632 10.9366 2.88632 8.88443 3.34105L8.43056 3.44162C5.70602 4.04534 3.55805 6.13983 2.88539 8.84875C2.37154 10.9181 2.37154 13.0819 2.88539 15.1513C3.55805 17.8602 5.70601 19.9547 8.43056 20.5584L8.88443 20.659"
                                stroke="#363853"
                                strokeWidth="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M8.15112 10.3501L10.7216 12.1866C11.4864 12.7329 12.5136 12.7329 13.2783 12.1866L15.8489 10.3501"
                                stroke="#363853"
                                strokeWidth="1.5"
                                stroke-linecap="round"
                              />
                            </svg>
                            {userDetails?.email_address}
                          </li>
                          <li>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                                stroke="#363853"
                                strokeWidth="1.5"
                                stroke-miterlimit="10"
                              />
                            </svg>
                            {userDetails?.mobile_number !== "" &&
                            userDetails?.mobile_number !== null ? (
                              <>
                                <span className="me-2">
                                  {userDetails?.country_code}
                                </span>
                                {userDetails?.mobile_number}
                              </>
                            ) : (
                              "-"
                            )}
                          </li>
                          <li className="mb-0">
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
                                  ></path>
                                  <g id="Vector_2">
                                    <path
                                      d="M8 9C8 9.55228 7.55228 10 7 10C6.44772 10 6 9.55228 6 9C6 8.44772 6.44772 8 7 8C7.55228 8 8 8.44772 8 9Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M18 9C18 9.55228 17.5523 10 17 10C16.4477 10 16 9.55228 16 9C16 8.44772 16.4477 8 17 8C17.5523 8 18 8.44772 18 9Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                                      fill="#363853"
                                    ></path>
                                    <path
                                      d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                                      fill="#363853"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </svg>
                            {userDetails?.dob !== "" &&
                            userDetails?.dob !== null ? (
                              <span className="me-2">
                                {moment(userDetails?.dob?.split("T")[0]).format(
                                  "D MMM, YYYY"
                                )}
                              </span>
                            ) : (
                              "-"
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="border-gred">
                      <div className="inner-gred">
                        <h4 className="dec_title">About</h4>
                        <p className="about-desc">
                          {userDetails?.provider_introduction}
                        </p>
                      </div>
                    </div>
                    {userDetails?.website_link?.length > 0 &&
                      userDetails?.website_link[0] !== "" && (
                        <>
                          <div className="border-gred">
                            <div className="inner-gred">
                              <ul>
                                {userDetails?.website_link?.map((data) => {
                                  return (
                                    <>
                                      <li>
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M8.98999 21.5C7.32999 21.5 5.65999 20.87 4.38999 19.6C1.85999 17.06 1.85999 12.94 4.38999 10.41C4.67999 10.12 5.15999 10.12 5.44999 10.41C5.73999 10.7 5.73999 11.18 5.44999 11.47C3.49999 13.42 3.49999 16.59 5.44999 18.54C7.39999 20.49 10.57 20.49 12.52 18.54C13.46 17.6 13.98 16.34 13.98 15C13.98 13.67 13.46 12.41 12.52 11.46C12.23 11.17 12.23 10.69 12.52 10.4C12.81 10.11 13.29 10.11 13.58 10.4C14.81 11.63 15.48 13.26 15.48 15C15.48 16.74 14.8 18.37 13.58 19.6C12.32 20.87 10.66 21.5 8.98999 21.5Z"
                                            fill="#363853"
                                          />
                                          <path
                                            d="M19.07 14.16C18.88 14.16 18.69 14.09 18.54 13.94C18.25 13.65 18.25 13.17 18.54 12.88C20.59 10.83 20.59 7.49999 18.54 5.45999C16.49 3.40999 13.16 3.40999 11.12 5.45999C10.13 6.44999 9.58002 7.76999 9.58002 9.16999C9.58002 10.57 10.13 11.89 11.12 12.88C11.41 13.17 11.41 13.65 11.12 13.94C10.83 14.23 10.35 14.23 10.06 13.94C8.79002 12.67 8.08002 10.97 8.08002 9.16999C8.08002 7.36999 8.78002 5.66999 10.06 4.39999C12.69 1.76999 16.97 1.76999 19.61 4.39999C22.24 7.02999 22.24 11.32 19.61 13.95C19.46 14.09 19.26 14.16 19.07 14.16Z"
                                            fill="#363853"
                                          />
                                        </svg>
                                        {data}
                                      </li>
                                    </>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </>
                      )}

                    <div className="border-gred">
                      <div className="inner-gred pb-2">
                        <h4 className="dec_title float-start mb-2">
                          My Services
                        </h4>
                        <span
                          className="float-end"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setmodelShow(true);
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="add">
                              <g id="vuesax/outline/add">
                                <g id="add_2">
                                  <path
                                    id="Vector"
                                    d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                                    fill="#7A7883"
                                  />
                                  <path
                                    id="Vector_2"
                                    d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                                    fill="#7A7883"
                                  />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                        <div className="clearfix">
                          {/* {serviceData?.map((data) => {
                            return (
                              <>
                                <p className="d-flex justify-content-between mb-0 align-items-center">
                                  <span>{data?.service_name}</span>
                                  <input
                                    type="text"
                                    value={data?.amount}
                                    onBlur={() => {
                                      if (data?.amount !== "") {
                                        serviceEdit();
                                      }
                                    }}
                                    onChange={(e) => {
                                      const newValue = serviceData.map(
                                        (value) => {
                                          if (
                                            value?.service_id == data.service_id
                                          ) {
                                            return {
                                              ...value,
                                              amount: e.target.value,
                                            };
                                          } else {
                                            return value;
                                          }
                                        }
                                      );
                                      setserviceData(newValue);
                                    }}
                                    className="edit-number"
                                  />
                                </p>
                              </>
                            );
                          })} */}
                          <ul className="service_new_list">
                            {userService?.map((data) => {
                              return (
                                <>
                                  <li>
                                    <div className="d-flex justify-content-between mb-0 align-items-center">
                                      <h5 className="mb-0">
                                        {data?.service_name}
                                      </h5>
                                      <input
                                        type="text"
                                        readOnly
                                        className="edit-number"
                                        value={`$${data?.session_price}`}
                                      />
                                    </div>
                                    <div className="">
                                      <p className=" mb-0">
                                        <span>{data?.service_type}</span>
                                        <span>{data?.session_time} Hours</span>
                                        <span>{data?.participants} person</span>
                                      </p>
                                    </div>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-6 align-self-center text-center text-lg-end">
                    <div className="round-image">
                      <div className="first d-flex justify-content-center">
                        <div className="polygon-imgae">
                          <div className="p_image_shape">
                            <img
                              src={
                                userDetails?.provider_banner_images[0]
                                  ?.file_name
                                  ? userDetails?.provider_banner_images[0]
                                      ?.file_name
                                  : "/images/1.jpg"
                              }
                            />
                          </div>
                        </div>
                        <div className="polygon-imgae">
                          <div className="p_image_shape">
                            <img
                              src={
                                userDetails?.provider_banner_images[1]
                                  ?.file_name
                                  ? userDetails?.provider_banner_images[1]
                                      ?.file_name
                                  : "/images/2.png"
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="first d-flex justify-content-center">
                        <div className="polygon-imgae">
                          <div className="p_image_shape">
                            <img
                              src={
                                userDetails?.provider_banner_images[2]
                                  ?.file_name
                                  ? userDetails?.provider_banner_images[2]
                                      ?.file_name
                                  : "/images/3.jpg"
                              }
                            />
                          </div>
                        </div>
                        <div className="polygon-imgae">
                          <div className="p_image_shape">
                            <img
                              src={
                                userDetails?.provider_banner_images[3]
                                  ?.file_name
                                  ? userDetails?.provider_banner_images[3]
                                      ?.file_name
                                  : "/images/4.jpg"
                              }
                            />
                          </div>
                        </div>
                        <div className="polygon-imgae">
                          <div className="p_image_shape">
                            <img
                              src={
                                userDetails?.provider_banner_images[4]
                                  ?.file_name
                                  ? userDetails?.provider_banner_images[4]
                                      ?.file_name
                                  : "/images/5.jpg"
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="first d-flex justify-content-center">
                        <div className="polygon-imgae">
                          <div className="p_image_shape">
                            <img
                              src={
                                userDetails?.provider_banner_images[5]
                                  ?.file_name
                                  ? userDetails?.provider_banner_images[5]
                                      ?.file_name
                                  : "/images/6.jpg"
                              }
                            />
                          </div>
                        </div>
                        <div className="polygon-imgae">
                          <div className="p_image_shape">
                            <img
                              src={
                                userDetails?.provider_banner_images[6]
                                  ?.file_name
                                  ? userDetails?.provider_banner_images[6]
                                      ?.file_name
                                  : "/images/7.jpg"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <Modal
        centered
        className="largemodal add_service_modal"
        show={modelShow}
        onHide={() => {
          setmodelShow(false);
          setserviceForm({
            service: "",
            details: "in_person",
            details_link: "",
            location: "i_travel",
            adress: "",
            time: "",
            session_price: "",
            member: "",
            meximum_member: "",
            addition_price: "",
            discription: "",
          });
        }}
      >
        <button
          type="button"
          className="close-modal"
          onClick={() => {
            setmodelShow(false);
            setserviceData(
              userDetails?.provider_services?.map((value) => {
                return {
                  amount: value.admin_service_amount,
                  service_id: value._id,
                  description_name: value.description_name,
                };
              })
            );
            setserviceIdList(
              userDetails?.provider_services?.map((value) => {
                return value._id;
              })
            );
          }}
          style={{ position: "absolute", right: "20px", top: "20px" }}
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
        <form
          className="login_margin mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            serviceAdd();
          }}
        >
          <h3 className="mb-3 mb-md-3 page-title">Add Service</h3>
          <div className="row mt-5">
            <div className="col-12 col-md-6">
              <div className="group-input mt-2 p-15 clearfix">
                <input
                  type="text"
                  name=""
                  required
                  value={serviceForm.service}
                  onChange={(e) => {
                    setserviceForm({ ...serviceForm, service: e.target.value });
                  }}
                  placeholder="Enter service"
                />
              </div>
              <div className="detail_location">
                <h4 className="text-center">Details</h4>
                <div className="tablist">
                  <span
                    className={
                      serviceForm.details == "in_person" ? "t_active" : ""
                    }
                    onClick={() => {
                      setserviceForm({ ...serviceForm, details: "in_person" });
                    }}
                  >
                    In Person
                  </span>
                  <span
                    className={
                      serviceForm.details == "virtual" ? "t_active" : ""
                    }
                    onClick={() => {
                      setserviceForm({ ...serviceForm, details: "virtual" });
                    }}
                  >
                    Virtual
                  </span>
                  <span
                    className={serviceForm.details == "both" ? "t_active" : ""}
                    onClick={() => {
                      setserviceForm({ ...serviceForm, details: "both" });
                    }}
                  >
                    Both
                  </span>
                </div>
                {serviceForm.details !== "in_person" && (
                  <>
                    <div className="group-input mt-3 p-15 clearfix">
                      <input
                        type="url"
                        name=""
                        value={serviceForm.details_link}
                        onChange={(e) => {
                          setserviceForm({
                            ...serviceForm,
                            details_link: e.target.value,
                          });
                        }}
                        placeholder="Enter link"
                      />
                    </div>
                  </>
                )}

                <div className="text-center location_title">
                  <h4 className="text-center d-inline-block">
                    <img
                      src="images/loca.svg"
                      className="d-inline-block me-1"
                      style={{ verticalAlign: "top" }}
                    />
                    Location
                  </h4>
                </div>
                <div className="tablist">
                  <span
                    className={
                      serviceForm.location == "i_travel" ? "t_active" : ""
                    }
                    onClick={() => {
                      setserviceForm({ ...serviceForm, location: "i_travel" });
                    }}
                  >
                    I Travel
                  </span>
                  <span
                    className={
                      serviceForm.location == "i_host" ? "t_active" : ""
                    }
                    onClick={() => {
                      setserviceForm({ ...serviceForm, location: "i_host" });
                    }}
                  >
                    I Host
                  </span>
                  <span
                    className={serviceForm.location == "both" ? "t_active" : ""}
                    onClick={() => {
                      setserviceForm({ ...serviceForm, location: "both" });
                    }}
                  >
                    Both
                  </span>
                </div>
                {serviceForm.location !== "i_travel" && (
                  <>
                    <div className="group-input mt-3 p-15 clearfix">
                      <PlacesAutocomplete
                        value={serviceForm.adress}
                        onChange={(e) => {
                          setserviceForm({
                            ...serviceForm,
                            adress: e,
                          });
                        }}
                        onSelect={(address) => {
                          geocodeByAddress(address)
                            .then((results) => getLatLng(results[0]))
                            .then((latLng) => {
                              console.log("Success", latLng);
                              setserviceForm({
                                ...serviceForm,
                                adress: address,
                                locationCordinates: {
                                  type: "Point",
                                  coordinates: [latLng.lng, latLng.lat],
                                },
                              });
                            })
                            .catch((error) => console.error("Error", error));
                        }}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div>
                            <input
                              {...getInputProps({
                                placeholder: "Search Places ...",
                                className: "location-search-input",
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                  ? "suggestion-item--active"
                                  : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? {
                                      backgroundColor: "#fafafa",
                                      cursor: "pointer",
                                    }
                                  : {
                                      backgroundColor: "#ffffff",
                                      cursor: "pointer",
                                    };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="detail_location mt-0">
                <h4 className="text-center">Time Frame</h4>
                {/* <div className="group-input mt-2 p-15 clearfix">
                  <input
                    className="timeicom"
                    type="number"
                    name=""
                    required
                    max={24}
                    min={0}
                    value={serviceForm.time}
                    onChange={(e) => {
                      setserviceForm({
                        ...serviceForm,
                        time: e.target.value,
                      });
                    }}
                    placeholder="Select time"
                  />
                </div> */}
                <div className="row">
                  <div className="col-12 col-sm-6 mt-3">
                    <label htmlFor="">Session Hours</label>
                    <div className="group-input mt-2 p-15 clearfix">
                      <input
                        type="number"
                        name=""
                        required
                        max={24}
                        min={0}
                        value={serviceForm.session_hours}
                        onChange={(e) => {
                          setserviceForm({
                            ...serviceForm,
                            session_hours: e.target.value,
                          });
                        }}
                        placeholder="2"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 mt-3">
                    <label htmlFor=""> Session Minutes</label>
                    <div className="group-input mt-2 p-15 clearfix">
                      <input
                        type="number"
                        name=""
                        required
                        max={60}
                        min={0}
                        value={serviceForm.session_minutes}
                        onChange={(e) => {
                          setserviceForm({
                            ...serviceForm,
                            session_minutes: e.target.value,
                          });
                        }}
                        placeholder="15"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 mt-3">
                    <label htmlFor="">Session Price</label>
                    <div className="group-input mt-2 p-15 clearfix">
                      <input
                        type="number"
                        name=""
                        required
                        max={100000}
                        min={1}
                        value={serviceForm.session_price}
                        onChange={(e) => {
                          setserviceForm({
                            ...serviceForm,
                            session_price: e.target.value,
                          });
                        }}
                        placeholder="$500"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 mt-3">
                    <label htmlFor="">Participants</label>
                    <div className="group-input mt-2 p-15 clearfix d-flex">
                      <input
                        type="text"
                        name=""
                        value="1 -"
                        readOnly
                        style={{
                          width: "40px",
                          padding: "15px 0 15px 20px",
                          borderRadius: "3px 0 0 3px",
                        }}
                      />
                      <input
                        type="number"
                        name=""
                        required
                        max={10000}
                        min={1}
                        value={serviceForm.member}
                        onChange={(e) => {
                          setserviceForm({
                            ...serviceForm,
                            member: e.target.value,
                          });
                        }}
                        placeholder="2"
                        style={{
                          borderRadius: "0 3px 3px 0",
                          paddingLeft: "0",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 mt-3">
                    <label htmlFor=""> Price / Additional Participants</label>
                    <div className="group-input mt-2 p-15 clearfix">
                      <input
                        type="number"
                        name=""
                        required
                        max={100000}
                        min={1}
                        value={serviceForm.addition_price}
                        onChange={(e) => {
                          setserviceForm({
                            ...serviceForm,
                            addition_price: e.target.value,
                          });
                        }}
                        placeholder="$200"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 mt-3">
                    <label htmlFor="">Maximum Participants</label>
                    <div className="group-input mt-2 p-15 clearfix">
                      <input
                        type="number"
                        name=""
                        required
                        min={1}
                        max={10000}
                        value={serviceForm.meximum_member}
                        onChange={(e) => {
                          setserviceForm({
                            ...serviceForm,
                            meximum_member: e.target.value,
                          });
                        }}
                        placeholder="15"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="group-input mt-3 p-15 clearfix ">
                <textarea
                  name=""
                  required
                  value={serviceForm.discription}
                  onChange={(e) => {
                    setserviceForm({
                      ...serviceForm,
                      discription: e.target.value,
                    });
                  }}
                  style={{ height: "130px" }}
                  placeholder="Describe your services (optional)"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <div className="btn_gred mt-4">
            {buttonLoader ? (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="btn_admina "
              >
                {/* save */}
                <div className="loader"></div>
              </a>
            ) : (
              <button type="submit" className="btn_admina">
                Save
              </button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UserProfile;
