import React, { useCallback, useEffect, useState } from "react";
import Header from "../Component/Header";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  APP_VERSION,
  BASE_URL,
  GOOGLE_API_KEY,
  URL_PATH,
} from "../Configration/configration";
import { Tooltip } from "react-bootstrap";
import Footer from "../Component/Footer";
import HomeMap from "../Component/HomeMap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoreService,
  getUserService,
  saveService,
} from "../action/userServiceConstant";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { loaderConstant } from "../action/constant";
import { getAllByPlaceholderText } from "@testing-library/react";
import { Rate } from "antd";
import { StarOutlined } from "@material-ui/icons";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const Home = () => {
  const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const dispatch = useDispatch();
  const [map, setMap] = useState(null);

  // const [serviceList, setserviceList] = useState([]);

  const latLong = window?.navigator?.geolocation?.getCurrentPosition(
    (position) => {
      return {
        lat: position?.coords?.latitude,
        lng: position?.coords?.longitude,
      };
    }
  );

  // const onLoad = React.useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new google.maps.LatLngBounds();
  //   markers.forEach(({ position }) => bounds.extend(position));
  //   map.fitBounds(bounds);
  // })

  const [center, setCenter] = useState(
    navigator?.geolocation?.getCurrentPosition((position) => {
      return {
        lat: position.coords.latitude || 0,
        lng: position.coords.longitude || 0,
      };
    })
  );

  const [registration, setregistration] = useState({
    provider_services: [],
    profile_picture: "",
    provider_introduction: "",
    website_links: [""],
    provider_banner_images: [],
    delete_banner_image_ids: [],
    is_other_desc: false,
    other_desc: "",
  });
  const [serviceOpen, setserviceOpen] = useState(false);

  const [userServiceQuery, setuserServiceQuery] = useState({
    page: 2,
    limit: 10,
    latLong: center,
  });

  const [firstTime, setfirstTime] = useState(true);

  useEffect(() => {
    if (!serviceOpen) {
      dispatch(
        getUserService({
          service_id: registration.provider_services,
          ...userServiceQuery,
          page: 1,
          latLong: center,
        })
      );
      setuserServiceQuery({ ...userServiceQuery, page: 2 });
    }
  }, [serviceOpen, center]);

  const fetchmoreData = () => {
    dispatch(
      fetchMoreService({
        service_id: registration.provider_services,
        ...userServiceQuery,
      })
    );
    setuserServiceQuery({
      ...userServiceQuery,
      page: userServiceQuery?.page + 1,
    });
  };
  const serviceList = useSelector((state) => state.service.serviceList);

  const userServiceList = useSelector((state) => state.userServiceList);
  const [location, setlocation] = useState("");

  const saveProvider = (id, status) => {
    dispatch(saveService({ id: id, status: status }));
  };

  return (
    <>
      <section class="main-page">
        <Header />
        <div class="main-inner p-0">
          <div class="d-flex position-relative">
            <div
              className="col-12 col-lg-8 position-relative"
              style={{ height: "calc(100vh - 153px)" }}
            >
              {userServiceList?.length > 0 || firstTime == false ? (
                <>
                  <HomeMap serviceList={userServiceList} center={center} />
                </>
              ) : null}
            </div>
            <div
              className="col-lg-4 position-relative bg-white"
              style={{ height: "calc(100vh - 153px)" }}
            >
              <div className="w-100 p-2">
                <div className="rounded-2"></div>
              </div>
            </div>

            <div className="container position-absolute">
              <div className="row position-relative">
                <div className="col-12 col-lg-8 row">
                  <div className="col-12 col-lg-6 p-3">
                    <div class="group-input">
                      <PlacesAutocomplete
                        value={location}
                        onChange={(e) => {
                          setlocation(e);
                        }}
                        onSelect={(address) => {
                          geocodeByAddress(address)
                            .then((results) => getLatLng(results[0]))
                            .then((latLng) => {
                              console.log("Success", latLng);
                              setlocation(address);
                              setCenter({
                                lat: latLng.lat,
                                lng: latLng.lng,
                              });
                              setfirstTime(false);
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
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M20 11.1755C20 15.6907 16.4183 21 12 21C7.58172 21 4 15.6907 4 11.1755C4 6.66029 7.58172 3 12 3C16.4183 3 20 6.66029 20 11.1755Z"
                                stroke="#363853"
                                stroke-width="1.5"
                              />
                              <path
                                d="M9.5 10.5C9.5 9.11929 10.6193 8 12 8C13.3807 8 14.5 9.11929 14.5 10.5C14.5 11.8807 13.3807 13 12 13C10.6193 13 9.5 11.8807 9.5 10.5Z"
                                stroke="#363853"
                                stroke-width="1.5"
                              />
                            </svg>
                            <input
                              type="text"
                              required
                              {...getInputProps({
                                placeholder: "Search Places ...",
                                className: "location-search-input",
                              })}
                              className="ps-5"
                              placeholder="Search Place Here..."
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
                          </>
                        )}
                      </PlacesAutocomplete>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 p-3">
                    <div class="position-relative">
                      <div class="group-input">
                        <input
                          type="text"
                          name=""
                          placeholder="Select Discription Name"
                          class="select-servcesss map-select"
                          onClick={() => {
                            setserviceOpen(!serviceOpen);
                          }}
                        />
                      </div>
                      <div
                        class={serviceOpen ? "list-open open" : "list-open"}
                        style={{ scrollBehavior: "smooth" }}
                      >
                        {serviceList?.map((data) => {
                          return (
                            <>
                              <div class="group-input-check position-relative my-2">
                                <div class="">
                                  <label class="gred-checkbox">
                                    {data?.description_name}
                                    <input
                                      type="checkbox"
                                      checked={registration.provider_services.includes(
                                        data._id
                                      )}
                                      onClick={() => {
                                        let available = false;
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
                                              if (value !== data._id) {
                                                return value;
                                              }
                                            }
                                          );
                                        if (available) {
                                          setregistration({
                                            ...registration,
                                            provider_services: newValue,
                                          });
                                        } else {
                                          setregistration({
                                            ...registration,
                                            provider_services: [
                                              ...registration.provider_services,
                                              data._id,
                                            ],
                                          });
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </div>
                                {/* <h4 class="float-end">
                              {data?.admin_service_amount}
                            </h4> */}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 col-lg-4 position-absolute bg-white"
                  style={{
                    top: "0",
                    right: "0",
                    height: "calc(100vh - 153px)",
                    overflow: "auto",
                  }}
                  id="scrollableDiv"
                >
                  <InfiniteScroll
                    dataLength={userServiceList}
                    next={fetchmoreData}
                    hasMore={true}
                    scrollableTarget="scrollableDiv"
                  >
                    {userServiceList.map((data, index) => {
                      return (
                        <>
                          <div
                            className="w-100 p-2 position-relative"
                            key={`key _${index}`}
                          >
                            <Link
                              to={`/provider_details/${data?.user_id?._id}`}
                            >
                              <div
                                class="border-gred mb-0 p-0"
                                style={{ border: "1px solid #D0DEE2" }}
                              >
                                <div class="inner-gred d-flex align-items-center p-3">
                                  <div class="p_image_shape me-2 me-sm-3">
                                    <img src={data?.banner_image} />
                                  </div>
                                  <div className="w-100">
                                    <h4
                                      class="mb-1"
                                      style={{ fontSize: "18px" }}
                                    >
                                      {data?.service_name}
                                    </h4>
                                    <p
                                      class="mb-0"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {data?.description}
                                    </p>
                                    <div style={{ color: "#FFC107" }}>
                                      {data?.user_id?.average_rating > 0 ? (
                                        <StarIcon />
                                      ) : (
                                        <StarBorderIcon />
                                      )}
                                      {data?.user_id?.average_rating > 1 ? (
                                        <StarIcon />
                                      ) : (
                                        <StarBorderIcon />
                                      )}
                                      {data?.user_id?.average_rating > 2 ? (
                                        <StarIcon />
                                      ) : (
                                        <StarBorderIcon />
                                      )}
                                      {data?.user_id?.average_rating > 3 ? (
                                        <StarIcon />
                                      ) : (
                                        <StarBorderIcon />
                                      )}
                                      {data?.user_id?.average_rating > 4 ? (
                                        <StarIcon />
                                      ) : (
                                        <StarBorderIcon />
                                      )}
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                      <h5
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "700",
                                        }}
                                        className="mb-0"
                                      >
                                        {data?.user_id?.name}
                                      </h5>
                                      <div className="d-flex align-items-center">
                                        <div class="me-2 me-sm-2">
                                          <img
                                            src="images/mapDiscovery.svg"
                                            style={{ width: "18px" }}
                                          />
                                        </div>
                                        <p
                                          className="map_des m-0 p-0"
                                          style={{
                                            fontSize: "14px",
                                            color: "#FFC107",
                                          }}
                                        >
                                          {data?.miles_distance} Mile Away
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <img
                              className="position-absolute"
                              src={
                                data?.is_save
                                  ? "images/save.svg"
                                  : "images/saveIcon.svg"
                              }
                              height="26px"
                              onClick={() => {
                                if (data?.is_save) {
                                  saveProvider(data?._id, false);
                                } else {
                                  saveProvider(data?._id, true);
                                }
                              }}
                              style={{
                                cursor: "pointer",
                                top: "20px",
                                right: "20px",
                              }}
                            />
                          </div>
                        </>
                      );
                    })}
                    {userServiceList.length < 1 && (
                      <p className="text-center mt-4">No data Found</p>
                    )}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Home;
