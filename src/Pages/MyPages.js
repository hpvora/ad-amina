import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import { Box, Button, Grid, IconButton } from "@mui/material";
import TextArea from "antd/es/input/TextArea";
import RemoveLinkPopUp from "../Component/RemoveLinkPopUp";
import clockIcon from "../assets/images/clock.svg";
import locationIcon from "../assets/images/Discovery.svg";
import RemoveServicePopUp from "../Component/RemoveServicePopUp";
import { useDispatch, useSelector } from "react-redux";
import { getMyPageDetails } from "../action/myPageConstant";

const SERVICE = [
  {
    id: 1,
    title: "Cupping Therapy",
    subtitle: "In Person",
    location: "IBIZA, SPAIN",
    time: "4 Hours",
    sessionPrice: "$25",
    participants: "1-5",
    additionalPrice: "$15",
    maxParticipants: "15",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been theindustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    id: 2,
    title: "Electroacupuncture",
    subtitle: "Virtual",
    location: "IBIZA, SPAIN",
    time: "4 Hours",
    sessionPrice: "$25",
    participants: "1-5",
    additionalPrice: "$15",
    maxParticipants: "15",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been theindustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    id: 3,
    title: "Breathwork",
    subtitle: "Virtual",
    location: "IBIZA, SPAIN",
    time: "4 Hours",
    sessionPrice: "$25",
    participants: "1-5",
    additionalPrice: "$15",
    maxParticipants: "15",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been theindustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
];

const MyPages = () => {
  const [webLinks, setWebLinks] = useState([""]);
  const [deleteModal, setDeleteModal] = useState({
    link: false,
    service: false,
  });

  const [inputData, setInputData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPageDetails());
  }, []);

  const myDetails = useSelector((state) => state.myPageDetails);

  useEffect(() => {
    setInputData(myDetails);
  }, [myDetails]);

  console.log(myDetails, "myDetails");

  return (
    <>
      <section className="main-page">
        <Header />
        <div className="main-inner">
          <div className="container">
            {/*.........page section.........*/}

            <Box>
              <h3 style={{ fontWeight: "600", marginBottom: "25px" }}>
                My Pages
              </h3>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box className="inner-gred page-Container-height">
                      <p>How Would you like to be Introduced? </p>
                      <Box className="border-gred">
                        <TextArea
                          value={inputData?.provider_introduction}
                          onChange={(e) => {
                            setInputData({
                              ...inputData,
                              provider_introduction: e.target.value,
                            });
                          }}
                          rows={8}
                          cols={6}
                          className="inner-gred"
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box className="inner-gred page-Container-height">
                      <Box className="d-flex justify-content-between align-items-center">
                        <p>Do you have a website? Or more links?</p>
                        <span
                          className="plus-icon float-end"
                          onClick={() => {
                            setInputData({...inputData, website_link : [...inputData?.website_link, ""]})
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
                      </Box>
                      <Box>
                        <Box style={{height : '225px' , overflow : 'auto'}}>
                          {inputData?.website_link?.map((data, i) => {
                            return (
                              <>
                                <div className="group-input mt-2 p-15 clearfix">
                                  <input
                                    type="url"
                                    name=""
                                    value={inputData?.website_link[i]}
                                    onChange={(e) => {
                                      const newValue =
                                        inputData?.website_link?.map(
                                          (value, j) => {
                                            if (i == j) {
                                              return e.target.value;
                                            } else {
                                              return value;
                                            }
                                          }
                                        );
                                      setInputData({
                                        ...inputData,
                                        website_link: newValue,
                                      });
                                    }}
                                    placeholder="Your Link here"
                                  />
                                  {inputData?.website_link?.length > 1 && (
                                    <>
                                      <span
                                        className="remove new-remove"
                                        style={{ top: "16px", right: "16px" }}
                                        onClick={() =>
                                          setDeleteModal((pre) => ({
                                            ...pre,
                                            link: true,
                                          }))
                                        }
                                        // onClick={() => {
                                        //     setWebLinks({
                                        //         ...webLinks,
                                        //         webLinks: webLinks?.filter((datanew, j) => {
                                        //             return i !== j;
                                        //         }),
                                        //     });
                                        // }}
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
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/*.........Services section.......... */}

            <Box className="mt-5">
              <h3 style={{ fontWeight: "600", marginBottom: "25px" }}>
                My Services
              </h3>
              <Box>
                <Grid container spacing={2}>
                  {SERVICE.map((service, i) => (
                    <Grid item xs={12} sm={6} lg={4}>
                      <Box className="border-gred">
                        <Box className="inner-gred">
                          <Box className="d-flex align-items-center justify-content-between">
                            <h4 className="input-label">{service.title}</h4>
                            <Box>
                              <IconButton>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                >
                                  <path
                                    d="M15.3334 5.16644C14.0835 5.58308 12.4169 3.91654 12.8336 2.66663M12.7325 2.76773L10.0396 5.46054C8.86897 6.63122 8.03847 8.09805 7.63693 9.7042L7.50681 10.2247C7.46627 10.3868 7.61316 10.5337 7.77533 10.4932L8.2958 10.3631C9.90195 9.96153 11.3688 9.13103 12.5395 7.96035L15.2323 5.26754C15.5638 4.93604 15.75 4.48644 15.75 4.01763C15.75 3.0414 14.9586 2.25 13.9824 2.25C13.5136 2.25 13.064 2.43623 12.7325 2.76773Z"
                                    stroke="#363853"
                                  />
                                  <path
                                    d="M9 2.25C8.2325 2.25 7.46501 2.33822 6.71282 2.51466C4.62976 3.00328 3.00328 4.62975 2.51466 6.71282C2.16178 8.21719 2.16178 9.78281 2.51466 11.2872C3.00328 13.3702 4.62976 14.9967 6.71283 15.4853C8.21719 15.8382 9.78281 15.8382 11.2872 15.4853C13.3702 14.9967 14.9967 13.3702 15.4853 11.2872C15.6618 10.535 15.75 9.76748 15.75 8.99998"
                                    stroke="#363853"
                                    stroke-linecap="round"
                                  />
                                </svg>
                              </IconButton>
                              <IconButton
                                sx={{ padding: "0" }}
                                onClick={() =>
                                  setDeleteModal((pre) => ({
                                    ...pre,
                                    service: true,
                                  }))
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                    fill="#FFD8D8"
                                  />
                                  <path
                                    d="M9.17 14.8299L14.83 9.16992"
                                    stroke="#FF0000"
                                    strokeWidth="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M14.83 14.8299L9.17 9.16992"
                                    stroke="#FF0000"
                                    strokeWidth="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </IconButton>
                            </Box>
                          </Box>
                          <span>{service.subtitle}</span>
                          <hr />
                          <Box>
                            <Box className="d-flex gap-2 align-items-center">
                              <img src={locationIcon} alt="clock_Icon" />
                              <span style={{ fontWeight: "600" }}>
                                {service.location}
                              </span>
                            </Box>
                            <Box className="d-flex gap-2 align-items-center">
                              <img src={clockIcon} alt="clock_Icon" />
                              <span style={{ fontWeight: "600" }}>
                                {service.time}
                              </span>
                            </Box>
                          </Box>
                          <Box className="d-flex gap-5 mt-3">
                            <Box>
                              <Box>
                                <span className="grey-text">Session Price</span>
                                <p style={{ margin: "0" }}>
                                  {service.sessionPrice}
                                </p>
                              </Box>
                              <Box className="mt-2">
                                <span className="grey-text">
                                  Additional Price
                                </span>
                                <p style={{ margin: "0" }}>
                                  {service.additionalPrice}
                                </p>
                              </Box>
                            </Box>
                            <Box>
                              <Box>
                                <span className="grey-text">Participants</span>
                                <p style={{ margin: "0" }}>
                                  {service.participants}
                                </p>
                              </Box>
                              <Box className="mt-2">
                                <span className="grey-text">
                                  Maximum Participants
                                </span>
                                <p style={{ margin: "0" }}>
                                  {service.maxParticipants}
                                </p>
                              </Box>
                            </Box>
                          </Box>
                          <hr />
                          <span className="grey-text">{service.desc}</span>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>

            <Box className="d-flex flex-wrap align-items-center mt-3">
              <button className="btn_admina">Add Service</button>
              <button className="btn_White ms-auto">Cenacle</button>
              <button className="btn_admina">Save</button>
            </Box>
          </div>
        </div>

        {/*.............pop-up's............*/}
        <RemoveLinkPopUp open={deleteModal} setOpen={setDeleteModal} />
        <RemoveServicePopUp open={deleteModal} setOpen={setDeleteModal} />
      </section>
    </>
  );
};

export default MyPages;
